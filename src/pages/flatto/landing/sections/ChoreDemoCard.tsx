import { ChoreDemo } from "../content/types";
import { Icon } from "../ui/Icon";

interface ChoreDemoCardProps {
  demo: ChoreDemo;
}

// The app's "Your turn" card, working. behaviour/choreDemo.ts flips data-state and reveals the two
// buttons; without JavaScript it stays a still picture of the card.
export const ChoreDemoCard = ({ demo }: ChoreDemoCardProps) => (
  <div className="chore-demo" data-chore-demo data-state="pending">
    <p className="chore-demo__prompt">{demo.prompt}</p>
    <div className="chore-card">
      <p className="chore-card__label">{demo.label}</p>
      <p className="chore-card__name">
        <span className="chore-card__icon">
          <Icon name="chores" size={22} />
        </span>
        <span>
          <strong>{demo.chore}</strong>
          <span className="chore-card__due">{demo.due}</span>
        </span>
      </p>
      <p className="chore-card__tasks">{demo.tasks}</p>
      <button className="chore-card__action" type="button" data-chore-action="done" hidden>
        <Icon name="check" />
        {demo.action}
      </button>
      <button className="chore-card__undo" type="button" data-chore-action="undo" hidden>
        {demo.undo}
      </button>
    </div>
    <div className="chore-week">
      <span>{demo.weekLabel}</span>
      <span className="chore-week__count chore-week__count--pending">{demo.weekPending}</span>
      <span className="chore-week__count chore-week__count--done">{demo.weekDone}</span>
      <span className="chore-week__bar" aria-hidden="true">
        <span className="chore-week__fill" />
      </span>
    </div>
    <p className="chore-result" role="status" data-chore-status>
      <span className="chore-result__event" data-chore-event hidden>
        <Icon name="chores" size={16} />
        {demo.result}
      </span>
      <span className="chore-result__payoff" data-chore-event hidden>
        {demo.payoff}
      </span>
    </p>
  </div>
);
