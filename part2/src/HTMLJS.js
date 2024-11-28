import {
  cities,
  workshops,
  employees,
  brigades,
  employments,
} from '../test-data.js';
import {
  saveData,
  getSavedData,
} from './savedData.js';
import {
  createIndex,
  initSelect,
} from './utils.js';



/** @param {HTMLElement} root */
export function main(root) {
  /** @type {HTMLFormElement} */
  const form = root.querySelector('form');
  if (!form) {
    console.error('Form element not found');
    return;
  }

  /** @type {HTMLSelectElement} */
  const citySelect = form.elements.city;
  initSelect(citySelect, cities);


  const workshopsByCity = createIndex(workshops, 'city_id');
  /** @type {HTMLSelectElement} */
  const workshopSelect = form.elements.workshop;
  citySelect.addEventListener('change', () => {
    workshopSelect.innerHTML = '';
    const cityId = Number(citySelect.value);
    const _workshops = workshopsByCity[cityId];
    initSelect(workshopSelect, _workshops);
    employeeSelect.selectedIndex = -1;
  });


  const employeesByWorkshop = createIndex(employees, 'workshop_id');
  /** @type {HTMLSelectElement} */
  const employeeSelect = form.elements.employee;
  workshopSelect.addEventListener('change', () => {
    employeeSelect.innerHTML = '';
    const workshopId = Number(workshopSelect.value);
    const _employees = employeesByWorkshop[workshopId];
    initSelect(employeeSelect, _employees);
  });


  /** @type {HTMLSelectElement} */
  const brigadeSelect = form.elements.brigade;
  initSelect(brigadeSelect, brigades);


  /** @type {HTMLSelectElement} */
  const employmentSelect = form.elements.employment;
  initSelect(employmentSelect, employments);


  // Загрузка данных
  const savedData = getSavedData();
  if (savedData?.city) {
    citySelect.selectedIndex = cities.findIndex((element) => element.id == savedData.city)

    if (citySelect.selectedIndex !== -1) {
      citySelect.dispatchEvent(new Event('change'));
      if (savedData?.workshop) {
        workshopSelect.selectedIndex = workshopsByCity[savedData.city]
          .findIndex((element) => element.id == savedData.workshop);
        
        if (workshopSelect.selectedIndex !== -1) {
          workshopSelect.dispatchEvent(new Event('change'));
          if (savedData?.employee) {
            employeeSelect.selectedIndex = employeesByWorkshop[savedData.workshop]
              .findIndex((element) => element.id == savedData.employee);
          }
        }
      }
    }
  }
  if (savedData?.brigade) {
    brigadeSelect.selectedIndex = brigades.findIndex((element) => element.id == savedData.brigade);
  }
  if (savedData?.employment) {
    employmentSelect.selectedIndex = employments.findIndex((element) => element.id == savedData.employment);
  }


  // Сохранение данных
  form.addEventListener('change', () => {
    saveData({
      city: citySelect.value,
      workshop: workshopSelect.value,
      employee: employeeSelect.value,
      brigade: brigadeSelect.value,
      employment: employmentSelect.value,
    });
  });
}
