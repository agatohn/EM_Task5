export default function modalTemplate(element) {
  return `<div class='modal-block'>
    <div class='modal-item-img'>
      <img  src=${element.img} alt=${element.name} width='400' height='400' />
    </div>
      <ul class='modal-item-stats'>
        <li class='modal-item-stats-text'>
          Name: ${element.name}
        </li>
        <li class='modal-item-stats-text'>
          Height: ${element.height}
        </li>
        <li class='modal-item-stats-text'>
          Weight: ${element.weight}
        </li>       
      </ul>    
  </div>`;
}
