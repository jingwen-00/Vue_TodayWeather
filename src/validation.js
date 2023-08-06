export function requiredRule(e) {
	return [(v) => !!v || `${e} is required`];
}
