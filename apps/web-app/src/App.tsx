
import './App.css'
import { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { isBlank } from 'common'

import { IStaticMethods } from 'clarity/flyonui';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  
  const location = useLocation();

  console.log('location', location);
  useEffect(() => {
    const loadFlyonui = async () => {
      await import('clarity/flyonui');
      window.HSStaticMethods.autoInit();
    };
    loadFlyonui();
  }, []);
  
  return (
    <>
    <div class="max-w-sm">
  <select
    data-select='{
    "placeholder": "Select option...",
    "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
    "toggleClasses": "advance-select-toggle",
    "dropdownClasses": "advance-select-menu",
    "optionClasses": "advance-select-option selected:active",
    "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"icon-[tabler--check] flex-shrink-0 size-4 text-primary hidden selected:block \"></span></div>",
    "extraMarkup": "<span class=\"icon-[tabler--caret-up-down] flex-shrink-0 size-4 text-base-content absolute top-1/2 end-3 -translate-y-1/2 \"></span>"
    }'
    class="hidden"
  >
    <option value="">Choose</option>
    <option value="name">Full Name</option>
    <option value="email">Email Address</option>
    <option value="description">Project Description</option>
    <option value="user_id">User Identification Number</option>
  </select>
</div>
      <button className="btn btn-primary">Primary</button>
      <button class="btn btn-error">Error</button>
        <div class="flex items-center gap-1">
          <input type="checkbox" class="checkbox" id="defaultCheckbox1" />
          <label class="label label-text text-base" for="defaultCheckbox1">Default</label>
        </div>
        <div class="flex items-center gap-1">
          <input type="checkbox" class="checkbox" id="defaultCheckbox2" checked />
          <label class="label label-text text-base" for="defaultCheckbox2">Checked</label>
        </div>
      <p>undefined isBlank - {isBlank(undefined) ? 'true' : 'false'}</p>
      <p>false isBlank - {isBlank(false) ? 'true' : 'false'}</p>
      <p>true isBlank - {isBlank(true) ? 'true' : 'false'}</p>
      <p>Empty object isBlank - {isBlank({}) ? 'true' : 'false'}</p>

    </>
  )
}

export default App
