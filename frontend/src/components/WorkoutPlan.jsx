import React from "react";
import "./WorkoutPlan.css";

const WorkoutPlan = ({ plan }) => {

  if (!plan) {
    return (
      <div className="workout-plan">
        <h2>Your Workout Plan</h2>
        <p>Enter details to get a plan!</p>
      </div>
    );
  }

  return (
    <div className="workout-plan">
      <h2>{plan.title}</h2>
      <p><strong>Goal:</strong> {plan.goal}</p>

      {plan.weekly_plan.map((day, index) => (
        <div key={index} className="day-card">

          <h3>{day.day} — {day.focus}</h3>

          {day.exercises.map((ex, i) => (
            <p key={i}>
              {ex.name} — {ex.sets} x {ex.reps}
            </p>
          ))}

        </div>
      ))}

    </div>
  );
};

export default WorkoutPlan;
