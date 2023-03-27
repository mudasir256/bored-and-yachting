import Icon from '@/components/Icon'

//TODO, replace img tags with next images
export default function FileInputWithPicture({ handleFileSelect, fileSelected, src = '', label }) {
	return (<div>
		{label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
		<div className="flex flex-row items-center gap-4">
		{(fileSelected) ? <img alt="profile picture" className="rounded-full w-12 h-12 object-cover" src={URL.createObjectURL(fileSelected)} />
			: src ? <img alt="empty profile picture placeholder" className="rounded-full w-16 h-16 object-cover" src={src} />
			: <div className="bg-gray-100 rounded-full w-12 h-12 flex flex-row items-center justify-center">
					<Icon iconName="user" size="md" color="gray" />
				</div>
		}
			<div className="space-y-2">
				<label htmlFor="file-upload" className="cursor-pointer rounded-md bg-blue-100 text-sm text-blue-500 px-6 py-2">Choose File</label>
				<input onChange={handleFileSelect} id="file-upload" type="file" accept="image/*" hidden />
			</div>		
			</div>
	</div>)
}