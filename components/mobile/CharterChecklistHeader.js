import Subheader from '@/components/small/Subheader'
import Icon from '@/components/Icon'

export default function CharterChecklistHeader({ header, stepNumber, totalSteps, showBack, onBackClick = function() {} }) {
	return(
		<div className="border bg-gray-400 text-white p-2 flex flex-row justify-between gap-2 items-center">
			{showBack && <div onClick={() => onBackClick()} ><Icon name="left-arrow" color="white" size="sm" /></div>}
			<Subheader text={header} />
			{(stepNumber <= totalSteps && stepNumber !== 0) ? <p className="text-sm">Step {stepNumber} / {totalSteps}</p>: <p></p>}
		</div>
	)
}