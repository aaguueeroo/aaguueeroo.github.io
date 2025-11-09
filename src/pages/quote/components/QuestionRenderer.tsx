import React from 'react';
import { Question, QuestionType, Answer, CompositeAnswer, ContactAnswer, SliderTriangleAnswer } from '../types';
import { CardGridQuestion } from './specific/CardGridQuestion';
import { CompositeQuestion } from './specific/CompositeQuestion';
import { SliderTriangleQuestion } from './specific/SliderTriangleQuestion';
import { TextInputQuestion } from './specific/TextInputQuestion';
import { ContactFormQuestion } from './specific/ContactFormQuestion';

interface QuestionRendererProps {
  question: Question;
  answer: Answer | undefined;
  onAnswerChange: (answer: Answer) => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  answer,
  onAnswerChange,
}) => {
  switch (question.type) {
    case QuestionType.SINGLE_SELECT:
      return (
        <CardGridQuestion
          question={question}
          selectedValues={answer as string}
          onSelect={(value) => {
            onAnswerChange(value);
          }}
        />
      );

    case QuestionType.MULTI_SELECT:
      return (
        <CardGridQuestion
          question={question}
          selectedValues={(answer as string[]) || []}
          onSelect={(value) => {
            const currentValues = (answer as string[]) || [];
            const newValues = currentValues.includes(value)
              ? currentValues.filter((v) => v !== value)
              : [...currentValues, value];
            onAnswerChange(newValues);
          }}
        />
      );

    case QuestionType.COMPOSITE:
      return (
        <CompositeQuestion
          question={question}
          selectedValues={(answer as CompositeAnswer) || {}}
          onSelect={(subQuestionId, value) => {
            const currentValues = (answer as CompositeAnswer) || {};
            onAnswerChange({
              ...currentValues,
              [subQuestionId]: value,
            });
          }}
        />
      );

    case QuestionType.SLIDER_TRIANGLE:
      return (
        <SliderTriangleQuestion
          value={(answer as SliderTriangleAnswer) || []}
          onChange={(value) => {
            onAnswerChange(value);
          }}
        />
      );

    case QuestionType.TEXT_INPUT:
      return (
        <TextInputQuestion
          question={question}
          value={(answer as string) || ''}
          onChange={(value) => {
            onAnswerChange(value);
          }}
        />
      );

    case QuestionType.CONTACT_FORM:
      return (
        <ContactFormQuestion
          value={
            (answer as ContactAnswer) || {
              name: '',
              email: '',
              phone: '',
              company: '',
            }
          }
          onChange={(value) => {
            onAnswerChange(value);
          }}
        />
      );

    default:
      return null;
  }
};