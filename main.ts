// main.ts

/**
 * Grove Moisture Sensor Erweiterung
 */
//% color=#8f3fd1 icon="\uf20e" block="Feuchtigkeitssensor MG"
//% groups=['Grundfunktionen', 'Erweiterungen']
namespace feuchtigkeit {

    let sensorPin: AnalogPin = AnalogPin.C16

    let trockenKalibrierung = 1023
    let nassKalibrierung = 300

    let letzterProzentwert = -1

    //% group="Grundfunktionen"
    //% block="Feuchtigkeitssensor initialisieren an Pin %pin"
    //% pin.defl=AnalogPin.C16
    export function initialisieren(pin: AnalogPin): void {

        sensorPin = pin
        basic.pause(100)
    }

    //% group="Grundfunktionen"
    //% block="Kalibrierung trocken %trocken nass %nass"
    export function kalibrieren(
        trocken: number,
        nass: number
    ): void {

        trockenKalibrierung = trocken
        nassKalibrierung = nass
    }

    //% group="Grundfunktionen"
    //% block="Feuchtigkeitswert lesen (Rohwert)"
    export function rohwert(): number {

        let wert = pins.analogReadPin(sensorPin)

        if (wert < 0) wert = 0
        if (wert > 1023) wert = 1023

        return wert
    }

    //% group="Grundfunktionen"
    //% block="Feuchtigkeit (in Prozent)"
    export function prozent(): number {

        let wert = rohwert()

        let feuchtigkeit =
            Math.map(
                wert,
                trockenKalibrierung,
                nassKalibrierung,
                0,
                100
            )

        if (feuchtigkeit < 0) feuchtigkeit = 0
        if (feuchtigkeit > 100) feuchtigkeit = 100

        return Math.round(feuchtigkeit)
    }

    //% group="Erweiterungen"
    //% block="Boden trocken unter %grenzwert"
    //% grenzwert.defl=30
    export function istTrocken(
        grenzwert: number
    ): boolean {

        return prozent() < grenzwert
    }

    //% group="Erweiterungen"
    //% block="Boden nass über %grenzwert"
    //% grenzwert.defl=70
    export function istNass(
        grenzwert: number
    ): boolean {

        return prozent() > grenzwert
    }

    //% group="Erweiterungen"
    //% block="Wenn Feuchtigkeit sich um mehr als %schwelle ändert"
    //% schwelle.defl=10
    export function wennFeuchtigkeitAendert(
        schwelle: number
    ): boolean {

        let aktuell = prozent()

        if (letzterProzentwert < 0) {

            letzterProzentwert = aktuell
            return false
        }

        let delta =
            Math.abs(
                aktuell - letzterProzentwert
            )

        letzterProzentwert = aktuell

        return delta > schwelle
    }

    //% group="Grundfunktionen"
    //% block="Durchschnitt von %anzahl Messungen"
    //% anzahl.defl=5
    export function durchschnitt(
        anzahl: number
    ): number {

        if (anzahl <= 0) return 0

        let summe = 0

        for (let i = 0; i < anzahl; i++) {

            summe += prozent()
            basic.pause(50)
        }

        return Math.round(summe / anzahl)
    }

    //% group="Erweiterungen"
    //% block="Minimale Feuchtigkeit innerhalb %dauer ms"
    export function minimaleFeuchtigkeit(
        dauer: number
    ): number {

        let min = 100
        let start = control.millis()

        while (
            control.millis() - start < dauer
        ) {

            let wert = prozent()

            if (wert < min) {
                min = wert
            }

            basic.pause(100)
        }

        return min
    }

    //% group="Erweiterungen"
    //% block="Maximale Feuchtigkeit innerhalb %dauer ms"
    export function maximaleFeuchtigkeit(
        dauer: number
    ): number {

        let max = 0
        let start = control.millis()

        while (
            control.millis() - start < dauer
        ) {

            let wert = prozent()

            if (wert > max) {
                max = wert
            }

            basic.pause(100)
        }

        return max
    }

    //% group="Erweiterungen"
    //% block="Warte bis Boden trocken unter %grenzwert oder %timeout ms"
    export function warteBisTrocken(
        grenzwert: number,
        timeout: number
    ): boolean {

        let start = control.millis()

        while (
            prozent() >= grenzwert
        ) {

            if (
                control.millis() - start
                > timeout
            ) {

                return false
            }

            basic.pause(200)
        }

        return true
    }
}
