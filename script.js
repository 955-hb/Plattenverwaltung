document.addEventListener("DOMContentLoaded", function () {
  // Hole den Übernehmen-Button und füge ihm einen Klick-Event-Listener hinzu
  const btnÜbernehmen = document.getElementById("btn-übernehmen");

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
      console.log("Interpret:", interpret);
      console.log("Albumtitel:", albumtitel);
      console.log("Erscheinungsjahr:", erscheinungsjahr);

      // Zeige eine Meldung mit den Daten an
      //alert(
      //  `Neue Platte hinzugefügt:\nInterpret: ${interpret}\nAlbum: ${albumtitel}\nErscheinungsjahr: ${erscheinungsjahr}`
      //);

      // Leere die Input-Felder
      interpretInput.value = "";
      albumtitelInput.value = "";
      erscheinungsjahrInput.value = "";
    } else {
      alert("Bitte alle Felder ausfüllen.");
    }
  });
});
