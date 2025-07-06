import { PointCloudRenderer } from "@omni-annotator/pointcloud";

const renderer = new PointCloudRenderer();
renderer.render(new Float32Array(/* ...点云数据... */));
