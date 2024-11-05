// leeres Array --> Plattensammlung
const plattenSammlung = [];

document.addEventListener("DOMContentLoaded", function () {
  // Hole den Übernehmen-Button und füge ihm einen Klick-Event-Listener hinzu
  const btnÜbernehmen = document.getElementById("btn-übernehmen");
  const btnExport = document.getElementById("btn-anzeigen");

  // Klick-Event-Handler für den Übernehmen-Button
  btnÜbernehmen.addEventListener("click", function () {
    // Greife auf die Input-Felder selbst zu
    const interpretInput = document.querySelector(".inputInterpret");
    const albumtitelInput = document.querySelector(".inputAlbum");
    const erscheinungsjahrInput = document.querySelector(".inputJahr");

    // Hole die Werte der Input-Felder
    const interpret = interpretInput.value;
    const albumtitel = albumtitelInput.value;
    const erscheinungsjahr = erscheinungsjahrInput.value;

    // Überprüfe die Eingaben (optional)
    if (interpret && albumtitel && erscheinungsjahr) {
      //console.log("Interpret:", interpret);
      //console.log("Albumtitel:", albumtitel);
      //console.log("Erscheinungsjahr:", erscheinungsjahr);

      const newAlbum = {
        interpret: interpret,
        albumtitel: albumtitel,
        erscheinungsjahr: erscheinungsjahr,
      };

      // Objekt dem Sammlungs-Array hinzufügen
      plattenSammlung.push(newAlbum);
      console.log(plattenSammlung);
      console.log(plattenSammlung.length);

      // Leere die Input-Felder
      interpretInput.value = "";
      albumtitelInput.value = "";
      erscheinungsjahrInput.value = "";
    } else {
      alert("Bitte alle Felder ausfüllen.");
    }
  });

  btnExport.addEventListener("click", function exportExcel() {
    console.log("Plattensammlung vor Export:", plattenSammlung);

    // wenn das Array leer ist eine Warnung ausgeben!
    if (plattenSammlung.length === 0) {
      alert("Deine Plattensammlung ist noch leer.");
      return;
    }

    // Zeitstempel
    const formatDate = (date) => {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      return new Intl.DateTimeFormat("de-DE", options)
        .format(date)
        .replace(/\./g, "/")
        .replace(",", "");
    };

    // generiere aktuellen Zeitstempel +1Hour
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours());
    const timeStamp = formatDate(currentDate);

    // #1 Arbeitsblatt aus Array erstellen
    const ws = XLSX.utils.json_to_sheet(plattenSammlung);

    // #2 neue Arbeitsmappe erstellen --> Arbeitsblatt hinzufügen
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plattensammlung");

    // #3 xls.file erstellen + bereitstellen
    // Excel-Export wird in downloads-Ordner bereitgestellt.
    XLSX.writeFile(wb, `Plattensammlung_${timeStamp}.xlsx`);
  });
});
