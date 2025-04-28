import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div>
				<div>
					<h1>Workland</h1>
					<h4>¡El trabajo de tus suenos, te espera!</h4>
					<div class="input-group mb-3">
						<input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
						<button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
					</div>
				</div>
				<div>
					{/* Card */}
					<div class="card mb-3 h-[500px]">
						<div class="row g-0 bg-success">
							<div class="col-md-4 bg-danger">
								<img src="https://placehold.co/300x100" class="img-fluid rounded-start" alt="..." />
							</div>
							<div class="col-md-8 d-flex align-items-center ">
								<div class="card-body d-flex flex-column h-75 bg-primary">
									<h5 class="card-title justify-content-start w-25 bg-warning">Card title</h5>
									<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
									<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
								</div>
							</div>
						</div>
					</div>

					<div class="card mb-3" >
						<div class="row g-0">
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">Card title</h5>
									<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
									<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
								</div>
							</div>
							<div class="col-md-4">
								<img src="https://placehold.co/600x400" class="img-fluid rounded-start" alt="..." />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
