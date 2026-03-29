#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

function checkPortfolioChanges() {
  try {
    const portfolioPath = "src/config/portfolioInfo.js";

    // Verificar si el archivo está en el staging area o ha sido modificado
    const status = execSync(`git status --porcelain ${portfolioPath}`, {
      encoding: "utf8",
    });

    if (status.trim()) {
      console.log("✅ portfolioInfo.js ha sido modificado");
      process.exit(0);
    } else {
      console.error("❌ portfolioInfo.js NO ha sido modificado");
      console.error("");
      console.error(
        "💡 Debes modificar la fecha en src/config/portfolioInfo.js antes de hacer commit",
      );
      console.error("   Abre el archivo y actualiza la fecha manualmente");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error al verificar cambios:", error.message);
    process.exit(1);
  }
}

checkPortfolioChanges();
