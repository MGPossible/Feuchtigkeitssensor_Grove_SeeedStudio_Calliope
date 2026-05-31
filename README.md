# Grove Feuchtigkeitssensor Erweiterung für den Calliope mini

## Übersicht

Diese Erweiterung ermöglicht die einfache Verwendung eines Grove Bodenfeuchtigkeitssensors am Calliope mini innerhalb des MakeCode-Editors.

Die Erweiterung wurde für den Unterricht, Maker-Projekte, Pflanzenüberwachung und Smart-Garden-Projekte entwickelt.

Typische Einsatzbereiche:

- Pflanzenbewässerung
- Smart Gardening
- Umweltmessungen
- MINT-Unterricht
- Automatische Warnsysteme
- Datenlogging

---

# Messprinzip

Der Grove Feuchtigkeitssensor misst den elektrischen Widerstand zwischen zwei Leitflächen.

Grundprinzip:

- Feuchte Erde → niedriger Widerstand
- Trockene Erde → höherer Widerstand

Daraus entstehen Rohwerte zwischen ungefähr:

```text
0 bis 1023
```

Interpretation:

| Zustand | Rohwert |
|---|---:|
| Sehr nass | klein |
| Feucht | mittel |
| Trocken | groß |

---

# Kalibrierung

Da unterschiedliche Sensoren verschiedene Messbereiche besitzen, sollten die Kalibrierwerte angepasst werden.

## Trockenen Wert bestimmen

Sensor vollständig trocken messen:

```typescript
serial.writeNumber(feuchtigkeit.rohwert())
```

Wert notieren.

## Nassen Wert bestimmen

Sensor in feuchte Erde stecken.

Wert notieren.

Danach:

```typescript
feuchtigkeit.kalibrieren(
    trockenerWert,
    nasserWert
)
```

Standard:

```text
trocken = 1023
nass = 300
```

---

# Funktionen

## Initialisieren

Konfiguriert den verwendeten Analog-Pin.

```typescript
feuchtigkeit.initialisieren(
    AnalogPin.C16
)
```

---

## Rohwert lesen

Liest direkt den analogen Sensorwert.

```typescript
let wert =
    feuchtigkeit.rohwert()
```

---

## Prozentwert lesen

Berechnet einen Prozentwert.

Definition:

- 0 % = trocken
- 100 % = nass

```typescript
let p =
    feuchtigkeit.prozent()
```

---

## Trockenheit prüfen

```typescript
if (
    feuchtigkeit.istTrocken(30)
) {

}
```

Bedeutung:

Unter 30 % → trocken

---

## Nässe prüfen

```typescript
if (
    feuchtigkeit.istNass(70)
) {

}
```

---

## Änderung erkennen

Erkennt größere Änderungen.

```typescript
if (
    feuchtigkeit.wennFeuchtigkeitAendert(10)
) {

}
```

---

## Durchschnitt bilden

Mehrere Messungen mitteln.

```typescript
let avg =
    feuchtigkeit.durchschnitt(5)
```

---

## Minimale Feuchtigkeit

```typescript
let min =
feuchtigkeit.minimaleFeuchtigkeit(
    5000
)
```

Misst über 5 Sekunden.

---

## Maximale Feuchtigkeit

```typescript
let max =
feuchtigkeit.maximaleFeuchtigkeit(
    5000
)
```

---

## Warten bis Boden trocken

```typescript
feuchtigkeit.warteBisTrocken(
    30,
    60000
)
```

Parameter:

- 30 = Schwellwert
- 60000 = Timeout

---

# Beispielprojekt: Pflanzenüberwachung

```typescript
feuchtigkeit.initialisieren(
    AnalogPin.C16
)

basic.forever(function () {

    let wert =
    feuchtigkeit.prozent()

    basic.showNumber(wert)

    if (
        feuchtigkeit.istTrocken(30)
    ) {

        basic.showIcon(
            IconNames.Sad
        )

    } else {

        basic.showIcon(
            IconNames.Happy
        )
    }

    basic.pause(1000)
})
```

---

# Hinweise zur Lebensdauer

Viele günstige Feuchtigkeitssensoren korrodieren bei Dauerbetrieb.

Empfehlungen:

- Nur kurz messen
- Sensor nach Messung abschalten
- Nicht dauerhaft unter Spannung lassen
- Edelstahl-Sensoren bevorzugen

---

# Fehlerbehebung

## Immer 0 %

Mögliche Ursachen:

- falscher Pin
- Sensor defekt
- Kurzschluss

## Immer 100 %

Mögliche Ursachen:

- Kalibrierung falsch
- Sensor dauerhaft nass

## Stark schwankende Werte

Lösungen:

- Durchschnitt verwenden
- Mehrfach messen
- Kabel prüfen
