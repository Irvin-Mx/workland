import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div>
				<div className="d-flex flex-column align-items-center">
					<h1>Workland</h1>
					<h4>¡El trabajo de tus suenos, te espera!</h4>
					<div class="input-group mb-3 w-50">
						<input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
						<button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass"></i></button>
					</div>
				</div>

				<div className="d-flex flex-column justify-content-center align-items-center">
					<div className="w-75">
						{/* Card */}
						<div class="card mb-3 ">
							<div class="row g-0 ">
								<div class="col-md-5 d-flex flex-column justify-content-center align-items-center p-4">
									<img src="https://placehold.co/500x200" class="img-fluid rounded-start object-fit-contain" alt="..." />
								</div>
								<div class="col-md-7 d-flex align-items-center ">
									<div class="card-body d-flex flex-column p-4">
										<h5 class="card-title justify-content-start w-25  fs-3">Card title</h5>
										<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non mauris vehicula, laoreet dolor sed, fermentum ante. Proin eleifend molestie neque, pulvinar euismod sem. Pellentesque vel malesuada orci. Donec ornare convallis tincidunt. Curabitur vitae lobortis purus, et scelerisque ligula. Suspendisse et pretium ante. Pellentesque eget libero eget ex efficitur ultricies. Sed feugiat consequat tincidunt. Mauris elementum laoreet molestie. </p>
										{/* <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
									</div>
								</div>
							</div>
						</div>

						{/* Card */}
						<div class="card mb-3">
							<div class="row g-0 ">
							<div class="col-md-7 d-flex align-items-center ">
									<div class="card-body d-flex flex-column p-4">
										<h5 class="card-title justify-content-start w-25  fs-3">Card title</h5>
										<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non mauris vehicula, laoreet dolor sed, fermentum ante. Proin eleifend molestie neque, pulvinar euismod sem. Pellentesque vel malesuada orci. Donec ornare convallis tincidunt. Curabitur vitae lobortis purus, et scelerisque ligula. Suspendisse et pretium ante. Pellentesque eget libero eget ex efficitur ultricies. Sed feugiat consequat tincidunt. Mauris elementum laoreet molestie. </p>
										{/* <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
									</div>
								</div>
								<div class="col-md-5 d-flex flex-column justify-content-center align-items-center p-4">
									<img src="https://placehold.co/500x200" class="img-fluid rounded-start object-fit-contain" alt="..." />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
