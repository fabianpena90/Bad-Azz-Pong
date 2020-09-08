function submit() {
  let player = document.querySelector("#p-name").value;

  window.location.href = `game.html?player=${player}`;
}
