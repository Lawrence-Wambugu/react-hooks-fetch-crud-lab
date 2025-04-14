import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch questions on mount
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(setQuestions)
      .catch(err => console.error("Error fetching questions:", err));
  }, []);

  // Add new question to state
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // Delete question both in state and server
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter(q => q.id !== id));
    });
  }

  // Update question correct answer
  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(questions.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    ));
  }

  return (
    <main>
      <section>
        <button onClick={() => setShowForm(false)}>View Questions</button>
        <button onClick={() => setShowForm(true)}>New Question</button>
      </section>

      {showForm ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
