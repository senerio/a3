function SaveData({cards, loadOnClick}) {

	function changeButtonText(buttonId, originalText, tempText) {
		let button = document.getElementById(buttonId)
		button.innerHTML = tempText
		setTimeout(() => { button.innerHTML = originalText }, 1500)
	}

	function copyToClipboard() {
		let copy = document.getElementById("copy_save_data");
		copy.select();
		copy.setSelectionRange(0, 99999);
		document.execCommand("copy");
		changeButtonText("copy_button", "Copy", "Copied!");
	}

	return (
		<div id="save_load">
			<div>
				<input
					id="copy_save_data"
					type="text"
					value={JSON.stringify(cards)}
					readOnly={true}
				/>
				<button
					id="copy_button"
					onClick={copyToClipboard}
				>
					Copy
				</button>
			</div>
			<div>
				<input
					id="load_save_data"
					type="text"
					value={undefined}
				/>
				<button
					id="load_button"
					onClick={() => {
						loadOnClick();
						changeButtonText("load_button", "Load", "Loaded!");
					}}
				>
					Load
				</button>
			</div>
		</div>
	)
}