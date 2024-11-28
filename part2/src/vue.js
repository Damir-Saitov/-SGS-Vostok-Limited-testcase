import {
  createApp,
  shallowRef,
  computed,
} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

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
import { createIndex } from './utils.js';


const savedDataCookieKey = 'savedData2';

/** @param {HTMLElement} root */
export function main(root) {
  createApp({
    setup() {
      const selectedCity = shallowRef();
      const selectedWorkshop = shallowRef();
      const selectedEmployee = shallowRef();
      const selectedBrigade = shallowRef();
      const selectedEmployment = shallowRef();

      const workshopsByCity = createIndex(workshops, 'city_id');
      const cityWorkshops = computed(() => {
        return workshopsByCity[selectedCity.value?.id] || [];
      });

      const employeesByWorkshop = createIndex(employees, 'workshop_id');
      const workshopEmployees = computed(() => {
        return employeesByWorkshop[selectedWorkshop.value?.id] || [];
      });


      // Загрузка данных
      const savedData = getSavedData(savedDataCookieKey);
      if (savedData?.city) {
        selectedCity.value = cities.find((element) => element.id == savedData.city).id;

        if (selectedCity.value !== -1 && savedData?.workshop) {
          selectedWorkshop.value = workshopsByCity[savedData.city]
            .find((element) => element.id == savedData.workshop).id;
          
          if (selectedWorkshop.value !== -1 && savedData?.employee) {
            selectedEmployee.value = employeesByWorkshop[savedData.workshop]
              .find((element) => element.id == savedData.employee).id;
          }
        }
      }
      if (savedData?.brigade) {
        selectedBrigade.value = brigades.find((element) => element.id == savedData.brigade).id;
      }
      if (savedData?.employment) {
        selectedEmployment.value = employments.find((element) => element.id == savedData.employment).id;
      }

      // Сохранение данных
      function onChangeForm() {
        saveData(savedDataCookieKey, {
          city: selectedCity.value,
          workshop: selectedWorkshop.value,
          employee: selectedEmployee.value,
          brigade: selectedBrigade.value,
          employment: selectedEmployment.value,
        });
      }


      return {
        cities,
        cityWorkshops,
        workshopEmployees,
        brigades,
        employments,

        selectedCity,
        selectedWorkshop,
        selectedEmployee,
        selectedBrigade,
        selectedEmployment,

        onChangeForm,
      };
    },
  }).mount(root);
}