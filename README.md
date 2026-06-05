# 🌱 Feuchtigkeitssensor MG – MakeCode Erweiterung

Diese Erweiterung hilft dir dabei, mit einem **Bodenfeuchtigkeitssensor** die Feuchtigkeit von Erde zu messen.
Damit kannst du erkennen, ob Pflanzen Wasser brauchen oder ob die Erde noch feucht genug ist 🌿💧

---

## 🔌 So funktioniert der Sensor

Der Feuchtigkeitssensor misst den elektrischen Widerstand im Boden.

* **Trockene Erde → hoher Messwert**
* **Feuchte Erde → niedriger Messwert**

👉 Die Erweiterung wandelt diese Werte in verständliche Prozentwerte um.

---

## 🚀 Grundfunktionen

### 🔧 Sensor starten

Feuchtigkeitssensor initialisieren an Pin C16

➡️ Damit sagst du dem Programm, an welchem Pin der Sensor angeschlossen ist.

---

### ⚙️ Sensor kalibrieren

Kalibrierung trocken 1023 nass 300

➡️ Speichert eigene Messwerte für trockene und nasse Erde.

**Tipp:**

* Trockenwert messen → Sensor in trockene Luft halten
* Nasswert messen → Sensor in sehr feuchte Erde stecken

---

### 📊 Feuchtigkeit messen (Prozent)

Feuchtigkeit (in Prozent)

➡️ Gibt die aktuelle Bodenfeuchtigkeit als Prozentwert zurück.

**0 % = sehr trocken**
**100 % = sehr nass**

---

### 🔢 Rohwert lesen

Feuchtigkeitswert lesen (Rohwert)

➡️ Gibt den unverarbeiteten Sensorwert zwischen **0 und 1023** zurück.

---

### 📈 Durchschnitt berechnen

Durchschnitt von 5 Messungen

➡️ Mehrere Messungen werden gemittelt, damit das Ergebnis stabiler wird.

---

## 🧠 Erweiterungen (Extra-Funktionen)

### 🌵 Boden trocken?

Boden trocken unter 30

➡️ Gibt **WAHR** zurück, wenn die Erde trockener als der Grenzwert ist.

---

### 💧 Boden nass?

Boden nass über 70

➡️ Gibt **WAHR** zurück, wenn die Erde feuchter als der Grenzwert ist.

---

### 🔄 Feuchtigkeit hat sich verändert

Wenn Feuchtigkeit sich um mehr als 10 Prozent ändert

➡️ Erkennt größere Änderungen der Bodenfeuchtigkeit.

---

### 📉 Kleinste Feuchtigkeit messen

Minimale Feuchtigkeit innerhalb 5000 ms

➡️ Sucht den kleinsten gemessenen Wert innerhalb der angegebenen Zeit.

---

### 📈 Größte Feuchtigkeit messen

Maximale Feuchtigkeit innerhalb 5000 ms

➡️ Sucht den größten gemessenen Wert innerhalb der angegebenen Zeit.

---

### ⏳ Warten bis Boden trocken ist

Warte bis Boden trocken unter 30 oder 10000 ms

➡️ Wartet, bis der Boden trocken genug ist oder das Zeitlimit erreicht wurde.

Rückgabe:

* **WAHR** → Boden wurde trocken
* **FALSCH** → Zeit abgelaufen

---

## 🌿 Typische Werte

| Bodenzustand | Feuchtigkeit |
| ------------ | ------------ |
| Sehr trocken | 0–20 %       |
| Trocken      | 20–40 %      |
| Normal       | 40–60 %      |
| Feucht       | 60–80 %      |
| Sehr nass    | 80–100 %     |

---

## ⚠️ Hinweise

* Sensor vor der ersten Nutzung kalibrieren
* Metallspitzen nicht dauerhaft im Wasser lassen
* Messwerte können je nach Erde unterschiedlich sein
* Durchschnittswerte liefern oft stabilere Ergebnisse

---

## 🎮 Ideen

* Automatische Pflanzenbewässerung
* Zimmerpflanzen überwachen
* Smart Garden bauen
* Warnung bei trockenem Boden
* LED-Anzeige für Pflanzenzustand
* Datenlogger für Bodenfeuchtigkeit 🌱📊
