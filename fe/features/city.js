import * as THREE from 'three';
export const createCity = (size) => {
    // tạo mảng 2 chiều
    const data = [];

    // duyệt qua các thành phần
    const initialize = (scene) => {
        let meshes = [];
        scene.clear();
        for (let x = 0; x < size; x++) {
            const col = [];
            for (let y = 0; y < size; y++) {
                const title = {
                    x,
                    y,
                    buildings : undefined
                };

                if (Math.random() > 0.7) {
                    title.buildings = 'buildings';
                }
                col.push(title);

                // 1. dùng lưới ( mesh ) / đối tượng 3D tương ứng với ô tại vị trí {x , y} trong city
                const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshLambertMaterial({ color: 0x2ca0c8 });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, 0, y);
                // 2. thêm đối tượng đó vào scene
                scene.add(mesh);
            }
            data.push(col);
            meshes.push(col);
        }
        setUpLights(scene);
    }

    const setUpLights = (scene) => {
        const lights = [
          new THREE.AmbientLight(0xffffff, 4.2),
          new THREE.DirectionalLight(0xffffff, 0.3),
          new THREE.DirectionalLight(0xffffff, 0.3),
          new THREE.DirectionalLight(0xffffff, 0.3)
        ];
  
        // ánh sáng từ trên xuống theo trục y 
        lights[1].position.set(0, 1, 0);
        // ánh sáng từ góc trên - phải
        lights[2].position.set(1, 1, 0);
        // ánh sáng từ góc trên - trước
        lights[3].position.set(0, 1, 1);
  
        // dùng ... để thêm tất cả ánh sáng cùng lúc
        scene.add(...lights);
      };

    return {
        size,
        data,
        initialize
    }
}