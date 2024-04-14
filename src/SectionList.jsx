import React, { useState } from "react";

function SectionList({ jsonData }) {
  const [sections, setSections] = useState(jsonData);
  const [activeSectionIndex, setActiveSectionIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveSectionIndex(index === activeSectionIndex ? null : index);
  };

  const handleCheckboxChange = (sectionIndex, goalIndex, itemIndex) => {
    const updatedSections = [...sections];
    const updatedChecklist =
      updatedSections[sectionIndex].goals[goalIndex].checklist;

    // Toggle the completion status of the clicked checklist item
    updatedChecklist[itemIndex].complete =
      !updatedChecklist[itemIndex].complete;

    // Update the 'complete' property of the section based on all checklist items
    updatedSections[sectionIndex].complete = updatedChecklist.every(
      (item) => item.complete
    );

    // Set the updated sections state
    setSections(updatedSections);
  };

  const handleDownload = () => {
    const jsonDataString = JSON.stringify(sections, null, 2);
    const blob = new Blob([jsonDataString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sections.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Sections</h1>
      <button onClick={handleDownload}>Download JSON</button>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} style={{ marginBottom: "20px" }}>
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => toggleSection(sectionIndex)}
          >
            {section.section}
          </h2>
          {activeSectionIndex === sectionIndex && (
            <div>
              {section.goals.map((goal, goalIndex) => (
                <div key={goalIndex} style={{ marginBottom: "10px" }}>
                  <h3>{goal.title}</h3>
                  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {goal.checklist.map((item, itemIndex) => (
                      <li key={itemIndex} style={{ marginBottom: "5px" }}>
                        <label
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="checkbox"
                            checked={item.complete}
                            onChange={() =>
                              handleCheckboxChange(
                                sectionIndex,
                                goalIndex,
                                itemIndex
                              )
                            }
                          />
                          <span style={{ marginLeft: "5px" }}>{item.text}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                  <p>Resources: {goal.resources.join(", ")}</p>
                  <p>Complete: {goal.complete.toString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SectionList;
