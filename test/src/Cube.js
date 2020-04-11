import React, { Component } from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// CSS-in-JS
const style = {
    height: 700,
    width:700
};

class Cube extends Component {

    // On crée des fonctions qui représente nos différents composants dans une méthode de montage: componentDidMount() + responsivité
    componentDidMount() {
        this.sceneSetup()
        this.addCustomSceneObject()
        this.startAnimationLoop()
        window.addEventListener('resize', this.handleWindowResize);
    }

    // Méthode de démontage (responsivité + animation + le controleur) = supression des écouteurs d'événements lié à la page.
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    // Composant qui configure la scene, la camera (position) + controleur et le moteur de rendu.
    sceneSetup = () => {
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);

        this.camera.position.z = 5;

        // Le deuxième paramètre permet de scroller en dehors de la scène.
        this.controls = new OrbitControls( this.camera, this.el );

        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setSize(width, height);
        this.el.appendChild(this.renderer.domElement);
    }

    // Composant qui configure notre objet 3D (cube) et nos lumières.
    addCustomSceneObject = () => {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
        color: 0x112345,
        emissive: 0x098767
        });

        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        const lights = [];
        lights[0] = new THREE.PointLight(0xffffff, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);

        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);

        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);
    };

    // Composant qui configure l'animation de notre objet.
    startAnimationLoop = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);

        //Utilisée requestID pour annuler la prochaine demande de trame planifiée dans la méthode de démontage.
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    }

    // Composant permettant la responsivité.
    handleWindowResize = () => {
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;

        this.camera.updateProjectionMatrix();
    };

    render() {
        return (
        <div style={style} ref={ref => (this.el = ref)} /> 
        )
    }
}

export default Cube;