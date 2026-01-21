import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/medicalService.js";

import { showAlert } from "../components/Alert.js";
import { renderMedicalTable } from "../components/medicalTable.js";
import { resetMedicalForm, fillMedicalForm } from "../components/medicalForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

export function initMedicalController() {

  loadMedical();

  $("medicalForm").addEventListener("submit", async (e) => {
  
    e.preventDefault();

    const data = {
      user_id: $("user_id").value.trim(),   
      disease: $("disease").value.trim(),
      genetic_disease: $("genetic_disease").value.trim(), 
      allergies: $("allergies").value.trim()    
    };

    const { editingId } = getState();

    editingId
      ? await updateMedical(editingId, data) 
      : await createNewMedical(data);        
  });

  $("cancelBtn").addEventListener("click", () => {

    setState({ editingId: null });
    resetMedicalForm();
  });
}

export async function loadMedical() {
  const spinner = $("loadingSpinner");
  const table = $("medicalTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const records = await apiGetAll();

  setState({ records });
  renderMedicalTable(records);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function createNewMedical(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Medical record added!");
    resetMedicalForm();
    loadMedical();
  }
}

export async function editMedical(id) {
  const record = await apiGetOne(id);

  setState({ editingId: id });
  fillMedicalForm(record);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

export async function updateMedical(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetMedicalForm();
    setState({ editingId: null });
    loadMedical();
  }
}

export async function deleteMedicalAction(id) {
  if (!confirm("Delete this medical record?")) return;

  const res = await apiDelete(id);
 	if (res.ok) {
    showAlert("Deleted!");
    loadMedical();
  }
}

