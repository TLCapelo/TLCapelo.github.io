import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // "./" gera caminhos relativos para os assets.
  // Assim funciona tanto em usuario.github.io quanto em usuario.github.io/repo/
  // sem precisar mudar nada quando você renomear o repositório.
  base: "./",
  plugins: [react(), tailwindcss()],
});
