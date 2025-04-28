export async function loadModuleC() {
  try {
    await import("../files/c.cjs");
    console.log("Module C loaded via dynamic import");
  } catch (err) {
    console.error("Failed to load module C:", err);
  }
}
