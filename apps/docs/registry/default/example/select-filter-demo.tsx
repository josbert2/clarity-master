"use client"

import {
  SelectFilter,
  SelectFilterClear,
  SelectFilterHeader,
  SelectFilterItem,
  SelectFilterList,
  SelectFilterSelected,
  SelectFilterTitle,
} from "@/registry/default/annui/select-filter"

export default function SelectFilterDemo() {
  return (
    <div className="h-72 pt-12">
      <SelectFilter>
        <SelectFilterSelected className="h-12" />
        <SelectFilterList>
          <SelectFilterHeader>
            <SelectFilterTitle>Select Filter</SelectFilterTitle>
            <SelectFilterClear>Clear</SelectFilterClear>
          </SelectFilterHeader>
          <SelectFilterItem color="#ff0000" value="product">
            Product
          </SelectFilterItem>
          <SelectFilterItem color="#0000ff" value="category">
            Category
          </SelectFilterItem>
          <SelectFilterItem color="#00ff00" value="brand">
            Brand
          </SelectFilterItem>
          <SelectFilterItem color="#ff00ff" value="design">
            Design
          </SelectFilterItem>
          <SelectFilterItem color="#000000" value="default">
            Default
          </SelectFilterItem>
        </SelectFilterList>
      </SelectFilter>
    </div>
  )
}
