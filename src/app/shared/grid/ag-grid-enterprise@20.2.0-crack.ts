import {LicenseManager} from 'ag-grid-enterprise';
import {LicenseManager as AgEnterpriseLicense} from '@ag-grid-enterprise/all-modules';

export function CrackAgGrid() {
   if (LicenseManager) {
      LicenseManager.prototype.validateLicense = () => true;
   }
   if (AgEnterpriseLicense) {
      AgEnterpriseLicense.prototype.validateLicense = () => true;
   }
}

CrackAgGrid();
