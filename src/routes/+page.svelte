<script lang="ts">
	let { data } = $props();
	let profile = data.profile;
</script>

<h1 class="text-xl">
	<span class="font-light">Welcome to the Shreshta Services</span> <span class="text-2xl font-bold">(ನಗದು)</span>, <span class="font-medium">{profile?.name || profile?.email}!</span> 👋
</h1>

<div>
	<section class="mt-8">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="text-5xl font-bold">Our Services</h2>
				<p class="py-6 text-lg">
					At Shreshta Services, we specialize in providing cutting-edge solutions for Document
					Management Systems (DMS), Surveys, Receipts, and Vouchers.
					<span class="font-serif text-xl"
						>We also provide solutions for any business process you manage.</span
					>
				</p>
				<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					<div class="card bg-primary text-primary-content">
						<div class="card-body">
							<h3 class="card-title">Document Management</h3>
							<p>
								Efficiently manage, store, and retrieve your documents with our robust DMS
								solutions.
							</p>
						</div>
					</div>
					<div class="card bg-secondary text-secondary-content">
						<div class="card-body">
							<h3 class="card-title">Survey Tools</h3>
							<p>Design and analyze surveys to gather valuable insights for your business.</p>
						</div>
					</div>
					<div class="card bg-accent text-accent-content">
						<div class="card-body">
							<h3 class="card-title">Receipts Management</h3>
							<p>Streamline your receipt generation and tracking processes with ease.</p>
						</div>
					</div>
					<div class="card bg-neutral text-neutral-content">
						<div class="card-body">
							<h3 class="card-title">Vouchers & Payments</h3>
							<p>Handle vouchers and payment workflows seamlessly with our tailored solutions.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
