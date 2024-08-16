import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Skeleton from "primevue/skeleton";
import ProgressSpinner from "primevue/progressspinner";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";


export function importComponents(app) {
  app.component("Button", Button);
  app.component("InputText", InputText);
  app.component("Password", Password);
  app.component("Skeleton", Skeleton);
  app.component("ProgressSpinner", ProgressSpinner);
  app.component("Breadcrumb", Breadcrumb);
  app.component("Calendar", Calendar);
}