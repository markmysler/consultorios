import Button from "primevue/button";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Skeleton from "primevue/skeleton";
import ProgressSpinner from "primevue/progressspinner";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import Dialog from 'primevue/dialog';


export function importComponents(app) {
  app.component("Button", Button);
  app.component("InputText", InputText);
  app.component("Password", Password);
  app.component("Skeleton", Skeleton);
  app.component("ProgressSpinner", ProgressSpinner);
  app.component("Breadcrumb", Breadcrumb);
  app.component("Calendar", Calendar);
  app.component("TabView", TabView);
  app.component("TabPanel", TabPanel);
  app.component("IconField", IconField);
  app.component("InputIcon", InputIcon);
  app.component("Accordion", Accordion);
  app.component("AccordionTab", AccordionTab);
  app.component("Dropdown", Dropdown);
  app.component("Checkbox", Checkbox);
  app.component("RadioButton", RadioButton);
  app.component("Dialog", Dialog);
}