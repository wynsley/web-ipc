export const SHOWCASE_MOSAIC = [
  {
    container:
      "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:auto-rows-[15rem] xl:auto-rows-[16rem]",
    cells: [
      {
        className:
          "col-span-2 aspect-[16/10] lg:col-span-6 lg:row-span-2 lg:aspect-auto",
        size: "lg",
      },
      { className: "aspect-square lg:col-span-3 lg:aspect-auto", size: "sm" },
      { className: "aspect-square lg:col-span-3 lg:aspect-auto", size: "sm" },
      {
        className: "col-span-2 aspect-[16/9] lg:col-span-6 lg:aspect-auto",
        size: "md",
      },
    ],
  },
  {
    container: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3",
    cells: [
      {
        className: "col-span-2 aspect-[16/10] lg:col-span-1 lg:aspect-square",
        size: "md",
      },
      { className: "aspect-square", size: "md" },
      { className: "aspect-square", size: "md" },
    ],
  },
]


export const EVENTS_MOSAIC = [
  {
    container: "grid grid-cols-2 items-center gap-3 sm:gap-4 lg:flex lg:gap-4",
    columns: [[0], [1, 2], [3, 4], [5]],
    columnClassName: "contents lg:flex lg:flex-1 lg:flex-col lg:gap-4",
    stagger: 0.12,
    cells: [
      { className: "w-full aspect-[4/5]", size: "md" },
      { className: "w-full aspect-[4/5]", size: "md" },
      { className: "w-full aspect-[10/9]", size: "md" },
      { className: "w-full aspect-[3/4]", size: "md" },
      { className: "w-full aspect-square", size: "md" },
      { className: "w-full aspect-[2/3]", size: "md" },
    ],
  },
]

// Cuántas fotos entran en un ciclo completo del layout
export const countCells = (layout) =>
  layout.reduce((total, group) => total + group.cells.length, 0)