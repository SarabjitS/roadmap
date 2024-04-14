import React from "react";

function SectionList({ jsonData }) {
  const handleDownload = () => {
    const jsonDataString = JSON.stringify(jsonData, null, 2);
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
      <ul>
        {jsonData.map((section, index) => (
          <li key={index}>
            <h2>{section.section}</h2>
            <ul>
              {section.goals.map((goal, goalIndex) => (
                <li key={goalIndex}>
                  <h3>{goal.title}</h3>
                  <ul>
                    {goal.checklist.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                  <p>Resources: {goal.resources.join(", ")}</p>
                  <p>Complete: {goal.complete.toString()}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SectionList;
