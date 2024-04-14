import React from "react";
import SectionList from "./SectionList"; // Assuming SectionList component is in a separate file

function App() {
  // JSON data for sections
  const sectionsData = [
    {
      section: "Module 1 - HTML, CSS, Javascript",
      goals: [
        {
          order: 0,
          title: "Learn HTML",
          checklist: [
            "What does HTML stand for",
            "What are different elements",
          ],
          resources: ["https://google.com"],
          complete: false,
        },
      ],
    },
    {
      section: "Module 2 - React",
      goals: [
        {
          order: 0,
          title: "Learn React",
          checklist: ["Why React", "What are different elements"],
          resources: ["https://google.com"],
          complete: false,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>My App</h1>
      <SectionList jsonData={sectionsData} />
    </div>
  );
}

export default App;
