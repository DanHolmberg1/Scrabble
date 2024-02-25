import { makeTilesDraggable } from "./main";

export function isTilePlaced(cellElement: HTMLElement): boolean {
    return cellElement.childElementCount > 0;
  }

export function refreshTiles(containerId: string, letters: string) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; // Clear existing tiles
    for (let i = 0; i < letters.length; i++) { // Re-create tiles
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.id = `tile-${containerId}-${i}`;
      tile.textContent = letters[i];
      container.appendChild(tile);
    }
    makeTilesDraggable(); // Make new tiles draggable
  }