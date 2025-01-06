"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { AdaptiveContainer } from "@/registry/default/annui/adaptive-container"

export default function AdaptiveContainerDemo() {
  const [expanded, setExpanded] = React.useState(false)
  return (
    <>
      <div
          class="bg-base-100 flex flex-col rounded-md shadow"
          data-datatable='{
          "pageLength": 5,
          "pagingOptions": {
            "pageBtnClasses": "btn btn-text btn-circle btn-sm"
          }
        }'
        >
          <div class="horizontal-scrollbar overflow-x-auto">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden">
                <table class="table min-w-full">
                  <thead>
                    <tr>
                      <th scope="col" class="group">
                        <div class="flex items-center justify-between">
                          Name
                          <span class="icon-[tabler--chevron-up] hidden datatable-ordering-asc:block"></span>
                          <span class="icon-[tabler--chevron-down] hidden datatable-ordering-desc:block"></span>
                        </div>
                      </th>
                      <th scope="col" class="group">
                        <div class="flex items-center justify-between">
                          Email
                          <span class="icon-[tabler--chevron-up] hidden datatable-ordering-asc:block"></span>
                          <span class="icon-[tabler--chevron-down] hidden datatable-ordering-desc:block"></span>
                        </div>
                      </th>
                      <th scope="col" class="group">
                        <div class="flex items-center justify-between">
                          Status
                          <span class="icon-[tabler--chevron-up] hidden datatable-ordering-asc:block"></span>
                          <span class="icon-[tabler--chevron-down] hidden datatable-ordering-desc:block"></span>
                        </div>
                      </th>
                      <th scope="col" class="group">
                        <div class="flex items-center justify-between">
                          Date
                          <span class="icon-[tabler--chevron-up] hidden datatable-ordering-asc:block"></span>
                          <span class="icon-[tabler--chevron-down] hidden datatable-ordering-desc:block"></span>
                        </div>
                      </th>
                      <th scope="col" class="--exclude-from-ordering">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-nowrap">John Doe</td>
                      <td>johndoe@example.com</td>
                      <td><span class="badge badge-soft badge-success badge-sm">Professional</span></td>
                      <td class="text-nowrap">March 1, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Jane Smith</td>
                      <td>janesmith@example.com</td>
                      <td><span class="badge badge-soft badge-error badge-sm">Rejected</span></td>
                      <td class="text-nowrap">March 2, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Alice Johnson</td>
                      <td>alicejohnson@example.com</td>
                      <td><span class="badge badge-soft badge-info badge-sm">Applied</span></td>
                      <td class="text-nowrap">March 3, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Bob Brown</td>
                      <td>bobrown@example.com</td>
                      <td><span class="badge badge-soft badge-primary badge-sm">Current</span></td>
                      <td class="text-nowrap">March 4, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Alice Johnson</td>
                      <td>alicej@example.com</td>
                      <td><span class="badge badge-soft badge-primary badge-sm">Current</span></td>
                      <td class="text-nowrap">January 15, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Chris Evans</td>
                      <td>chrisev@example.com</td>
                      <td><span class="badge badge-soft badge-secondary badge-sm">Inactive</span></td>
                      <td class="text-nowrap">November 20, 2023</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Dana White</td>
                      <td>danaw@example.com</td>
                      <td><span class="badge badge-soft badge-primary badge-sm">Current</span></td>
                      <td class="text-nowrap">February 2, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Ethan Hall</td>
                      <td>ethanh@example.com</td>
                      <td><span class="badge badge-soft badge-warning badge-sm">Pending</span></td>
                      <td class="text-nowrap">April 14, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Fiona Carter</td>
                      <td>fionac@example.com</td>
                      <td><span class="badge badge-soft badge-primary badge-sm">Current</span></td>
                      <td class="text-nowrap">March 9, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">George Smith</td>
                      <td>georges@example.com</td>
                      <td><span class="badge badge-soft badge-secondary badge-sm">Inactive</span></td>
                      <td class="text-nowrap">December 12, 2023</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Hannah Wright</td>
                      <td>hannahw@example.com</td>
                      <td><span class="badge badge-soft badge-warning badge-sm">Pending</span></td>
                      <td class="text-nowrap">June 10, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Isaac Long</td>
                      <td>isaacl@example.com</td>
                      <td><span class="badge badge-soft badge-primary badge-sm">Current</span></td>
                      <td class="text-nowrap">August 20, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Jane Davis</td>
                      <td>janed@example.com</td>
                      <td><span class="badge badge-soft badge-primary badge-sm">Current</span></td>
                      <td class="text-nowrap">July 3, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Kevin Lee</td>
                      <td>kevinl@example.com</td>
                      <td><span class="badge badge-soft badge-primary badge-sm">Current</span></td>
                      <td class="text-nowrap">May 12, 2024</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap">Linda Green</td>
                      <td>lindag@example.com</td>
                      <td><span class="badge badge-soft badge-secondary badge-sm">Inactive</span></td>
                      <td class="text-nowrap">October 7, 2023</td>
                      <td>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--pencil] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--trash] size-5"></span>
                        </button>
                        <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                          <span class="icon-[tabler--dots-vertical] size-5"></span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="border-base-content/25 flex items-center justify-between gap-3 border-t p-3 max-md:flex-wrap max-md:justify-center">
          <div class="text-sm text-base-content/80" data-datatable-info="">
              Showing
              <span data-datatable-info-from=""></span>
              to
              <span data-datatable-info-to=""></span>
              of
              <span data-datatable-info-length=""></span>
              users
            </div>
            <div class="flex hidden items-center space-x-1" data-datatable-paging="">
              <button type="button" class="btn btn-text btn-circle btn-sm" data-datatable-paging-prev="">
                <span aria-hidden="true">«</span>
                <span class="sr-only">Previous</span>
              </button>
              <div class="flex items-center space-x-1 [&>.active]:text-bg-soft-primary" data-datatable-paging-pages=""></div>
              <button type="button" class="btn btn-text btn-circle btn-sm" data-datatable-paging-next="">
                <span class="sr-only">Next</span>
                <span aria-hidden="true">»</span>
              </button>
            </div>
          </div>
        </div>

    </>
  )
}
