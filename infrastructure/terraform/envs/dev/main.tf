module "release_network" {
  source = "./modules/networking"

  vpc_cidr = "10.60.0.0/16"
}

module "release_eks_cluster" {
  source = "./modules/compute"

  cluster_name = "zero-downtime-cluster"
  node_count   = 4
}

module "release_metadata_db" {
  source = "./modules/database"

  instance_class = "db.t3.large"
}

resource "kubernetes_namespace" "release_mgmt" {
  metadata {
    name = "zero-downtime-strategies"
  }
}

resource "aws_alb" "ingress_controller" {
  name               = "release-ingress-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [module.release_network.sg_id]
  subnets            = module.release_network.public_subnets
}

resource "aws_prometheus_workspace" "reliability_metrics" {
  alias = "zero-downtime-reliability-hub"
}
