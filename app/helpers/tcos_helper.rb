module TcosHelper
	Assume = YAML.load_file("#{Rails.root}/public/data.yml").freeze
	Value = YAML.load_file("#{Rails.root}/public/nebula_data.yml").freeze

	def calculate_values
	  data = Assume["data"]
	  @total_assumed_each = []
		@total_cost_cloud = []
		@total_database_cost = []
	  for i in 0...(session[:value]["server_number"].count - 1)
			servers = session[:value]["server_number"][i]
			core = session[:value]["server_core_number"][i]
			pro = session[:value]["server_proc_number"][i]
			ram = session[:value]["server_ram_size"][i]
			os = session[:value]["server_os"][i]
			if session[:value]["server_gpu"][i] == "k80"
				gpu = data["k80"]
			else
				gpu = data["m60"]
			end
			cpu = core.to_i * pro.to_i
			it_admin = 8*240*50
			machine_cost,data_center = find_values(cpu,ram)
			electricity = 0.1 * machine_cost["power_rating"]
			rack = data["data_center_cost_per_rack"] * machine_cost["rack"]
			overhead_cost = it_admin + electricity + rack
			@total_assumed_each << (machine_cost["cost"] * servers.to_i) + overhead_cost + gpu.to_i
			@total_cost_cloud << data_center["cost"] * servers.to_i
		end
		for i in 0...(session[:value]["database_type"].count - 1)
			data_base_core = session[:value]["database_core_number"][i]
			database =  (data["sql_server_enterprise_licence_cost_per_2_cores"]+data["sql_server_standard_licence_cost_per_2_cores"]+data["enterprise_software_assurance_cost_per_2_cores"]+data["standard_software_assurance_cost_per_2_cores"])/2
			@total_database_cost << data_base_core.to_i * database.to_i
		end
		if session[:value]["bandwidth_type"] == "GB"
			@network = data["service_provider_cost_per_gb"].to_f * session[:value]["bandwidth"].to_f
		else
			@network = data["service_provider_cost_per_gb"].to_f * session[:value]["bandwidth"].to_f * 1024
		end
		@total_nebula = @total_cost_cloud.inject(0){|sum,x| sum + x } * 10
		@total_assumed = @total_assumed_each.inject(0){|sum,x| sum + x } + @total_database_cost.inject(0){|sum,x| sum + x } + @network
	end

	def find_values(c,r)
		data = Value["cloud_data"].select{|cpu| cpu["cpu"] == c }
		data_ram = data.select{|ram| ram["ram"] > r.to_i}.first
		cpu = Assume["data"]["machine"].select {|core| core["core"]*core["proc"] == c }
		ram = cpu.select{|ram| ram["ram"] > r.to_i }.first
		return ram,data_ram
	end
end
