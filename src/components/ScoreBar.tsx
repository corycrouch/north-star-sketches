import "@/styles/track-engagement.scss"

export default function ScoreBar({ score }: { score: number }) {
  return (
    <div className="score-bar">
      <div className="score-bar__track">
        <div className="score-bar__fill" style={{ width: `${score}%` }} />
      </div>
      <span className="score-bar__label">{score}</span>
    </div>
  )
}
