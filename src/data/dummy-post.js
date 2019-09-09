const files = [{
	name: "root",
	isDir: true,
	children: [{
		name: "dir1",
		isDir: true,
		children: [],
	}],
	children: [{
		name: "dir2",
		isDir: true,
		children: [{
			name: "file21",
			isDir: false,
		}],
	}],
	children: [{
		name: "dir3",
		isDir: true,
		children: [],
	}],
}, {
	name: ".gitignore",
	isDir: false,
}]