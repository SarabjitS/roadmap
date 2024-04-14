import React, { useState } from "react";

function SectionList({ jsonData }) {
  const [sections, setSections] = useState(jsonData);
  const [activeSectionIndex, setActiveSectionIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveSectionIndex(index === activeSectionIndex ? null : index);
  };

  const handleCheckboxChange = (sectionIndex, goalIndex, itemIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].goals[goalIndex].checklist[
      itemIndex
    ].complete =
      !updatedSections[sectionIndex].goals[goalIndex].checklist[itemIndex]
        .complete;

    // Check if all checklist items in the section are completed
    const allCompleted = updatedSections[sectionIndex].goals[
      goalIndex
    ].checklist.every((item) => item.complete);
    // Update the 'complete' property of the section's goal
    updatedSections[sectionIndex].goals[goalIndex].complete = allCompleted;
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
                  <ul>
                    {goal.checklist.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <label>
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
                          {item.text}
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
