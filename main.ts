// main.ts

/**
 * Grove Moisture Sensor Erweiterung
 */
//% color=#3cba54 icon="\uf043" block="Feuchtigkeitssensor by MG"
//% groups=['Grundfunktionen', 'Erweiterungen']
namespace feuchtigkeit {

    let letzterWert = 0;

    /**
     * Liest den Rohwert des Feuchtigkeitssensors.
     * Kleine Werte = nass
     * Große Werte = trocken
     */
    //% group="Grundfunktionen"
    //% block="Feuchtigkeitswert lesen an Pin %pin"
    //% block.tooltip="Liest den analogen Rohwert des Feuchtigkeitssensors."
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% pin.defl=AnalogPin.C16
    export function rohwert(pin: AnalogPin): number {

        let wert = pins.analogReadPin(pin);

        if (wert > 0) {
            letzterWert = wert;
        }

        basic.pause(20);

        return wert;
    }

    /**
     * Gibt die Feuchtigkeit in Prozent zurück.
     * 0% = trocken
     * 100% = nass
     */
    //% group="Grundfunktionen"
    //% block="Feuchtigkeit in [%] an Pin %pin"
    //% block.tooltip="Berechnet die Bodenfeuchtigkeit in Prozent."
    //% pin.defl=AnalogPin.C16
    export function prozent(pin: AnalogPin): number {

        let wert = rohwert(pin);

        // Werte ggf. anpassen
        let trocken = 1023;
        let nass = 300;

        let prozent = Math.map(wert, trocken, nass, 0, 100);

        if (prozent < 0) prozent = 0;
        if (prozent > 100) prozent = 100;

        return Math.round(prozent);
    }

    /**
     * Prüft ob der Boden trocken ist.
     */
    //% group="Erweiterungen"
    //% block="Boden trocken unter %grenzwert [%]"
    //% block.tooltip="Gibt 'true/wahr' zurück wenn der Boden trockener als der Grenzwert ist."
    //% grenzwert.defl=30
    //% pin.defl=AnalogPin.C16
    export function istTrocken(grenzwert: number, pin: AnalogPin): boolean {

        return prozent(pin) < grenzwert;
    }

    /**
     * Wartet bis der Boden trocken wird.
     */
    //% group="Erweiterungen"
    //% block="Warte bis Boden trocken unter %grenzwert %% an Pin %pin"
    //% block.tooltip="Hält das Programm an bis der Boden trockener als der Grenzwert ist."
    //% grenzwert.defl=30
    //% pin.defl=AnalogPin.C16
    export function warteBisTrocken(grenzwert: number, pin: AnalogPin): void {

        while (prozent(pin) >= grenzwert) {
            basic.pause(200);
        }
    }

    /**
     * Prüft ob sich die Feuchtigkeit geändert hat.
     */
    //% group="Erweiterungen"
    //% block="Wenn Feuchtigkeit sich ändert mehr als %schwelle %% an Pin %pin"
    //% block.tooltip="Gibt 'true' zurück wenn sich die Feuchtigkeit deutlich geändert hat."
    //% schwelle.defl=10
    //% pin.defl=AnalogPin.C16
    export function wennFeuchtigkeitAendert(schwelle: number, pin: AnalogPin): boolean {

        let aktuell = prozent(pin);

        let delta = Math.abs(aktuell - letzterWert);

        letzterWert = aktuell;

        return delta > schwelle;
    }

    /**
     * Durchschnitt aus mehreren Messungen.
     */
    //% group="Grundfunktionen"
    //% block="Durchschnitt von %anzahl Feuchtigkeitsmessungen an Pin %pin"
    //% block.tooltip="Berechnet den Durchschnitt mehrerer Feuchtigkeitsmessungen."
    //% anzahl.defl=5
    //% pin.defl=AnalogPin.C16
    export function durchschnitt(anzahl: number, pin: AnalogPin): number {

        let summe = 0;

        for (let i = 0; i < anzahl; i++) {
            summe += prozent(pin);
            basic.pause(50);
        }

        return Math.round(summe / anzahl);
    }

    /**
     * Gibt die minimale Feuchtigkeit in einem Zeitraum zurück.
     */
    //% group="Erweiterungen"
    //% block="Minimale Feuchtigkeit innerhalb von %dauer ms an Pin %pin"
    //% block.tooltip="Gibt die kleinste gemessene Feuchtigkeit zurück."
    //% dauer.defl=5000
    //% pin.defl=AnalogPin.C16
    export function minimaleFeuchtigkeit(dauer: number, pin: AnalogPin): number {

        let min = 100;
        let start = control.millis();

        while (control.millis() - start < dauer) {

            let wert = prozent(pin);

            if (wert < min) {
                min = wert;
            }

            basic.pause(100);
        }

        return min;
    }

    /**
     * Gibt die maximale Feuchtigkeit in einem Zeitraum zurück.
     */
    //% group="Erweiterungen"
    //% block="Maximale Feuchtigkeit innerhalb von %dauer ms an Pin %pin"
    //% block.tooltip="Gibt die höchste gemessene Feuchtigkeit zurück."
    //% dauer.defl=5000
    //% pin.defl=AnalogPin.C16
    export function maximaleFeuchtigkeit(dauer: number, pin: AnalogPin): number {

        let max = 0;
        let start = control.millis();

        while (control.millis() - start < dauer) {

            let wert = prozent(pin);

            if (wert > max) {
                max = wert;
            }

            basic.pause(100);
        }

        return max;
    }
}
