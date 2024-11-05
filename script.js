// leeres Array --> Plattensammlung LocalStorage
let plattenSammlung = JSON.parse(localStorage.getItem("plattenSammlung")) || [];

document.addEventListener("DOMContentLoaded", function () {
  // Hole den Übernehmen-Button und füge ihm einen Klick-Event-Listener hinzu
  const btnÜbernehmen = document.getElementById("btn-übernehmen");
  const btnExport = document.getElementById("btn-anzeigen");

  // LocalStorage
  function localStoragePlattensammlung() {
    localStorage.setItem("plattenSammlung", JSON.stringify(plattenSammlung));
  }

  // Funktion zur Prüfung ob ein Eintrag schon vorhanden ist
  function checkIfAlbumExists(interpret, albumtitel, erscheinungsjahr) {
    return plattenSammlung.some(
      (album) =>
        album.interpret === interpret &&
        album.albumtitel === albumtitel &&
        album.erscheinungsjahr === erscheinungsjahr
    );
  }

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

    // Überprüfe die Eingaben
    if (!interpret || !albumtitel || !erscheinungsjahr) {
      alert("Bitte alle Felder ausfüllen.");
      return;
    }

    // Prüfen, ob das Album bereits existiert
    if (checkIfAlbumExists(interpret, albumtitel, erscheinungsjahr)) {
      alert("Diese Platte hast du bereits.");
      return;
    }

    // Neues Album-Objekt erstellen und zur Sammlung hinzufügen
    const newAlbum = {
      interpret: interpret,
      albumtitel: albumtitel,
      erscheinungsjahr: erscheinungsjahr,
    };

    // Objekt dem Sammlungs-Array hinzufügen
    plattenSammlung.push(newAlbum);

    // neue Inputs LocalStorage hinzufügen
    localStoragePlattensammlung();

    // Bestätigung und Leeren der Input-Felder
    alert("Die neue Platte wurde erfolgreich hinzugefügt.");
    interpretInput.value = "";
    albumtitelInput.value = "";
    erscheinungsjahrInput.value = "";
  });

  // Klick-Event-Handler für den Export-Button
  btnExport.addEventListener("click", function exportExcel() {
    console.log("Plattensammlung vor Export:", plattenSammlung);

    // Warnung, wenn das Array leer ist
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

    // generiere aktuellen Zeitstempel
    const currentDate = new Date();
    const timeStamp = formatDate(currentDate);

    // #1 Arbeitsblatt aus Array erstellen
    const ws = XLSX.utils.json_to_sheet(plattenSammlung);

    // #2 neue Arbeitsmappe erstellen --> Arbeitsblatt hinzufügen
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plattensammlung");

    // #3 xls.file erstellen + bereitstellen
    XLSX.writeFile(wb, `Plattensammlung_${timeStamp}.xlsx`);
  });
});
