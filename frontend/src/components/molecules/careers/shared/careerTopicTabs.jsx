import { Paragraph } from "@/components/atoms/paragraph";
import { useRef } from "react";
import { Button } from "@/components/atoms/button";

function CareerTopicTabs({ items, selected, onSelect, idPrefix, label }) {
  const tabsRef = useRef(null);

  const handleKeyDown = (event, index) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    onSelect(next);
    tabsRef.current.querySelectorAll('[role="tab"]')[next].focus();
  };
  return (
    <div
      ref={tabsRef}
      role="tablist"
      aria-label={label}
      className="mt-10 grid grid-cols-2 border-b border-blue-dark/20 md:grid-cols-4"
    >
      {items.map((topic, index) => (
        <Button
          key={topic.title}
          type="button"
          role="tab"
          id={idPrefix + "-tab-" + index}
          aria-controls={idPrefix + "-panel-" + index}
          aria-selected={selected === index}
          tabIndex={selected === index ? 0 : -1}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onClick={() => onSelect(index)}
          className={`min-h-16 cursor-pointer border-b-2 px-3 py-4 text-left font-poppins text-sm transition-colors focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-orange ${selected === index ? "border-orange bg-blue-dark text-white" : "border-transparent text-blue-dark hover:bg-blue-dark/5"}`}
        >
          <Paragraph
            as="span"
            aria-hidden="true"
            className="mr-3 font-hani text-lg"
          >
            {"0" + (index + 1)}
          </Paragraph>
          {topic.label}
        </Button>
      ))}
    </div>
  );
}

export { CareerTopicTabs };
