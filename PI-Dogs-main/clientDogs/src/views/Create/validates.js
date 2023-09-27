
export default function validate(newDog){
    let errors={}

    // Validaciones regex
    const numEnteroPositivo=/^[1-9]\d*$/;
    const noNumeros=/^[^\d]*$/;
    const isUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    // Errores en nombre
    if (!newDog.name) {
        errors.name = "Name is required.";
    } else if (!noNumeros.test(newDog.name)) {
        errors.name = "The name must not contain numbers.";
    } else {
        errors.name = null;
    }

    // Errores en image
    if (!newDog.image) {
        errors.image = "Image URL is required.";
    } else if (isUrl.test(newDog.image)) {
        errors.image = "The field only accepts URLs.";
    } else {
        errors.image = null;
    }

    // Errores en weight
    const weightMin = parseInt(newDog.min_weight);
    const weightMax = parseInt(newDog.max_weight);
    if (!newDog.min_weight || !numEnteroPositivo.test(newDog.min_weight)) {
        errors.min_weight = "Weight min must be a positive number.";
    } else {
        errors.min_weight = null;
    }

    if (!newDog.max_weight || !numEnteroPositivo.test(newDog.max_weight)) {
        errors.max_weight = "Weight max must be a positive number.";
    } else if (weightMin && weightMax < weightMin) {
        errors.max_weight = "Weight max must be greater than the Weight min.";
    } else if (weightMax > 110) {
        errors.max_weight = "Weight max must be less than 110kg.";
    } else {
        errors.max_weight = null;
    }


    // Errores en height
    const heightMin = parseInt(newDog.min_height);
    const heightMax = parseInt(newDog.max_height);
    if (!newDog.min_height || !numEnteroPositivo.test(newDog.min_height)) {
        errors.min_height = "height min must be a positive number.";
    } else {
        errors.min_height = null;
    }

    if (!newDog.max_height || !numEnteroPositivo.test(newDog.max_height)) {
        errors.max_height = "height max must be a positive number.";
    } else if (heightMin && heightMax < heightMin) {
        errors.max_height = "height max must be greater than the Weight min.";
    } else {
        errors.max_height = null;
    }

    // errores en lifeSpan
    if(!newDog.min_lifeSpan){
        errors.min_lifeSpan="life Span is required."
    }else if(!numEnteroPositivo.test(newDog.min_lifeSpan)){
        errors.min_lifeSpan="life Span is required."
    }else errors.min_lifeSpan=null

    if(!newDog.max_lifeSpan){
        errors.max_lifeSpan="life span is required."
    }else if(!numEnteroPositivo.test(newDog.max_lifeSpan)){
        errors.max_lifeSpan="life span required number."
    }else {
        const lifeSpanMin = parseInt(newDog.min_lifeSpan);
        const lifeSpanMax = parseInt(newDog.max_lifeSpan);
        if (lifeSpanMin && lifeSpanMax < lifeSpanMin) {
            errors.max_lifeSpan = "life span max must be greater than the Height min.";
        }else if(newDog.max_lifeSpan>120){
            errors.max_lifeSpan="life span max must be less than 120cm."
        }else errors.max_lifeSpan=null
    }

   

    return errors
}