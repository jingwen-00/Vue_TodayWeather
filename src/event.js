import Swal from "sweetalert2";
export default [
	{
		name: "SUCCESS_ALERT",
		callback: function (e) {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Success",
				text: e,
				showConfirmButton: false,
				timer: 1500,
				heightAuto: false,
			});
		},
	},
	{
		name: "FAILED_ALERT",
		callback: function (e) {
			Swal.fire({
				position: "center",
				icon: "error",
				title: "Failed",
				text: e,
				showConfirmButton: false,
				timer: 1500,
				heightAuto: false,
			});
		},
	},
];
