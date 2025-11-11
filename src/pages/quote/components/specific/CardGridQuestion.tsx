import React from "react";
import { Grid2 as Grid } from "@mui/material";
import { motion } from "framer-motion";
import { Question } from "../../types";
import { GridOptionCard } from "./GridOptionCard";
import { cardStagger } from "../../utils/animations";
import { QUESTION_IDS } from "../../data/questionFlow";

interface CardGridQuestionProps {
  question: Question;
  selectedValues: string | string[];
  onSelect: (value: string) => void;
}

export const CardGridQuestion: React.FC<CardGridQuestionProps> = ({
  question,
  selectedValues,
  onSelect,
}) => {
  const selectedArray = Array.isArray(selectedValues)
    ? selectedValues
    : selectedValues
    ? [selectedValues]
    : [];

  const handleCardClick = (optionId: string) => {
    onSelect(optionId);
  };

  const isSelected = (optionId: string): boolean => {
    return selectedArray.includes(optionId);
  };

  if (!question.options) {
    return null;
  }

  const isAppFeaturesQuestion = question.id === QUESTION_IDS.APP_FEATURES;

  const gridItemSize = isAppFeaturesQuestion
    ? { xs: 6, sm: 4, md: 4, lg: 3 }
    : { xs: 12, sm: 6, md: 4 };

  return (
    <motion.div
      variants={cardStagger.container}
      initial="initial"
      animate="animate"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        justifyContent={isAppFeaturesQuestion ? "flex-start" : "space-between"}
        spacing={isAppFeaturesQuestion ? 2 : 4}
      >
        {question.options.map((option) => (
          <Grid
            key={option.id}
            size={gridItemSize}
            sx={{ display: "flex" }}
          >
            <GridOptionCard
              option={option}
              isSelected={isSelected(option.value)}
              onClick={handleCardClick}
              questionId={question.id}
            />
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};
