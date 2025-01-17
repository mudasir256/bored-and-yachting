import Icon from "@/components/Icon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BenefitGrid({ actions }) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
            actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
            actionIdx === actions.length - 1 ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none" : "",
            "group relative bg-gray-100 p-6"
          )}
        >
          <div>
            <span className={classNames(action.iconBackground, action.iconForeground, "inline-flex rounded-lg p-4 ring-4 ring-white ")}>
              <Icon name={action.iconName} />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold leading-6 text-gray-900">{action.title}</h3>
            <p className="mt-2 text-lg text-gray-500">{action.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}