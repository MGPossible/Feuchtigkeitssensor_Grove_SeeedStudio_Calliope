// main.ts

/**
 * Grove Moisture Sensor Erweiterung
 */
//% color=#3cba54 icon="\uf043" block="Feuchtigkeitssensor by MG"
//% groups=['Grundfunktionen', 'Erweiterungen']
namespace feuchtigkeit {

    let sensorPin: AnalogPin = AnalogPin.C16
    let letzterWert = 0

    /**
     * Initialisiert den Feuchtigkeitssensor.
     */
    //% group="Grundfunktionen"
    //% block="Feuchtigkeitssensor initialisieren an Pin %pin"
    //% block.tooltip="Legt fest an welchem Pin der Feuchtigkeitssensor angeschlossen ist."
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% pin.defl=AnalogPin.C16
    export function initialisieren(pin: AnalogPin): void {

        sensorPin = pin

        basic.pause(100)
    }

    /**
     * Liest den Rohwert des Feuchtigkeitssensors.
     * Kleine Werte = nass
     * Große Werte = trocken
     */
    //% group="Grundfunktionen"
    //% block="Feuchtigkeitswert lesen"
    //% block.tooltip="Liest den analogen Rohwert des Feuchtigkeitssensors."
    export function rohwert(): number {

        let wert = pins.analogReadPin(sensorPin)

        if (wert > 0) {
            letzterWert = wert
        }

        basic.pause(20)

        return wert
    }

    /**
     * Gibt die Feuchtigkeit in Prozent zurück.
     * 0% = trocken
     * 100% = nass
     */
    //% group="Grundfunktionen"
    //% block="Feuchtigkeit (%)"
    //% block.tooltip="Berechnet die Bodenfeuchtigkeit in Prozent."
    export function prozent(): number {

        let wert = rohwert()

        // Kalibrierwerte
        let trocken = 1023
        let nass = 300

        let feuchtigkeit = Math.map(wert, trocken, nass, 0, 100)

        if (feuchtigkeit < 0) feuchtigkeit = 0
        if (feuchtigkeit > 100) feuchtigkeit = 100

        return Math.round(feuchtigkeit)
    }

    /**
     * Prüft ob der Boden trocken ist.
     */
    //% group="Erweiterungen"
    //% block="Boden trocken unter %grenzwert (%)"
    //% block.tooltip="Gibt 'true/wahr' zurück wenn der Boden trockener als der Grenzwert ist."
    //% grenzwert.defl=30
    export function istTrocken(grenzwert: number): boolean {

        return prozent() < grenzwert
    }

    /**
     * Wartet bis der Boden trocken wird.
     */
    //% group="Erweiterungen"
    //% block="Warte bis Boden trocken unter %grenzwert (%)"
    //% block.tooltip="Hält das Programm an bis der Boden trockener als der Grenzwert ist."
    //% grenzwert.defl=30
    export function warteBisTrocken(grenzwert: number): void {

        while (prozent() >= grenzwert) {
            basic.pause(200)
        }
    }

    /**
     * Prüft ob sich die Feuchtigkeit geändert hat.
     */
    //% group="Erweiterungen"
    //% block="Wenn Feuchtigkeit sich ändert mehr als %schwelle (%)"
    //% block.tooltip="Gibt 'true' zurück wenn sich die Feuchtigkeit deutlich geändert hat."
    //% schwelle.defl=10
    export function wennFeuchtigkeitAendert(schwelle: number): boolean {

        let aktuell = prozent()

        let delta = Math.abs(aktuell - letzterWert)

        letzterWert = aktuell

        return delta > schwelle
    }

    /**
     * Durchschnitt aus mehreren Messungen.
     */
    //% group="Grundfunktionen"
    //% block="Durchschnitt von %anzahl Feuchtigkeitsmessungen"
    //% block.tooltip="Berechnet den Durchschnitt mehrerer Feuchtigkeitsmessungen."
    //% anzahl.defl=5
    export function durchschnitt(anzahl: number): number {

        let summe = 0

        for (let i = 0; i < anzahl; i++) {
            summe += prozent()
            basic.pause(50)
        }

        return Math.round(summe / anzahl)
    }

    /**
     * Gibt die minimale Feuchtigkeit in einem Zeitraum zurück.
     */
    //% group="Erweiterungen"
    //% block="Minimale Feuchtigkeit innerhalb von %dauer ms"
    //% block.tooltip="Gibt die kleinste gemessene Feuchtigkeit zurück."
    //% dauer.defl=5000
    export function minimaleFeuchtigkeit(dauer: number): number {

        let min = 100
        let start = control.millis()

        while (control.millis() - start < dauer) {

            let wert = prozent()

            if (wert < min) {
                min = wert
            }

            basic.pause(100)
        }

        return min
    }

    /**
     * Gibt die maximale Feuchtigkeit in einem Zeitraum zurück.
     */
    //% group="Erweiterungen"
    //% block="Maximale Feuchtigkeit innerhalb von %dauer ms"
    //% block.tooltip="Gibt die höchste gemessene Feuchtigkeit zurück."
    //% dauer.defl=5000
    export function maximaleFeuchtigkeit(dauer: number): number {

        let max = 0
        let start = control.millis()

        while (control.millis() - start < dauer) {

            let wert = prozent()

            if (wert > max) {
                max = wert
            }

            basic.pause(100)
        }

        return max
    }
}
