<template>
    <form @submit.prevent="newInvoice">
        <h2>Invoice #{{ randomName }}</h2>
        <section>
            <h4>Bill From</h4>
            <div class="styling-input">
                <label for="street">Street Adress</label>
                <input type="text" name="street" id="street" v-model="streetAdress" required>
            </div>
            <div class="adress-info">
                <div class="styling-input">
                    <label for="city">city</label>
                    <input type="text" name="city" id="city" v-model="city" required>
                </div>
                <div class="styling-input">
                    <label for="PostCode">PostCode </label>
                    <input type="text" name="PostCode" id="PostCode" v-model="postCode" required>
                </div>
                <div class="styling-input">
                    <label for="Country">Country</label>
                    <input type="text" name="Country" id="Country" v-model="country" required>
                </div>
            </div>
        </section>
        <section>
            <h4>Bill To</h4>
            <div class="styling-input">
                <label for="cName">Client's Name</label>
                <input type="text" name="cName" id="cName" v-model="cName" required>
            </div>
            <div class="styling-input">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" v-model="email" required>
            </div>
            <div class="styling-input">
                <label for="cStreet">Street Adress</label>
                <input type="text" name="cStreet" id="cStreet" v-model="cStreet">
            </div>
            <div class="adress-info">
                <div class="styling-input">
                    <label for="cCity">City </label>
                    <input type="text" name="cCity" id="cCity" v-model="cCity">
                </div>
                <div class="styling-input">
                    <label for="cPostCode">PostCode </label>
                    <input type="text" name="cPostCode" id="cPostCode" v-model="cPostCode">
                </div>
                <div class="styling-input">
                    <label for="cCountry">Country</label>
                    <input type="text" name="cCountry" id="cCountry" v-model="cCountry">
                </div>
            </div>
            <div class="adress-info">

                <div class="styling-input">
                    <label for="date">Invoice Date</label>
                    <input type="date" name="date" id="date" v-model="date" required>
                </div>
                <div class="styling-input">
                    <label for="paymentTerms">paymentTerms</label>
                    <select name="paymentTerms" id="paymentTerms" v-model="paymentTerms">
                        <option value="30days">Net 30 days</option>
                        <option value="60days">Net 60 days</option>
                    </select>
                </div>
                <div class="styling-input">

                    <label for="status">Status</label>
                    <select name="status" id="status" v-model="status">
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>
            </div>
            <div class="styling-input">
                <label for="description">Project Description</label>
                <input type="description" name="description" id="description" v-model="description">
            </div>
        </section>
        <section>
            <h3>Item List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Qty.</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in itemArray" :key="item.id">
                        <td><input type="text" name="iName" id="iName" v-model="item.itemName" required></td>
                        <td><input type="number" name="quantity" id="quantity" v-model="item.quantity" required></td>
                        <td><input type="number" name="price" id="price" v-model="item.price" required></td>
                        <td>{{ item.result + '€' }}</td>
                        <td><button @click.prevent="removeLine(item.id)">IMG</button></td>
                    </tr>
                </tbody>
            </table>
            <button @click.prevent="addItemLine">+ Add New Item</button>
        </section>
        <button @submit.prevent="newInvoice">Save Changes</button>
    </form>
</template>

<script>
import { ref, watchEffect, computed } from 'vue'
import { useInvoiceStore } from '../stores/InvoiceStore'
export default {
    setup() {
        const store = useInvoiceStore();
        const randomName = Math.random().toString(36).substr(2, 9);
        const streetAdress = ref('');
        const city = ref('');
        const postCode = ref('');
        const country = ref('');
        const cName = ref('');
        const email = ref('');
        const cStreet = ref('');
        const cCity = ref('');
        const cPostCode = ref('');
        const cCountry = ref('');
        const date = ref('');
        const paymentTerms = ref('');
        const description = ref('');
        const itemName = ref('');
        const quantity = ref(0);
        const price = ref(0);
        const status = ref('Pending');
        const result = ref(0);
        let total = ref(0)

        // Premier item près installé pour indiquer au client que l'on doit renseigner le détail de commande ici
        const itemArray = ref([{
            id: Math.floor(Math.random() * 100), // Génère un ID unique (ceci est juste un exemple)
            itemName: itemName.value,
            quantity: quantity.value,
            price: price.value,
            result: result.value,
        },
        ])
        //--------------------//
        // On rajoute une nouvelle ligne vide qu'on va rajouter au tableau "itemArray" pour permettre 
        // la saisie d'un nouvel article
        const addItemLine = () => {
            const item = {
                id: Math.floor(Math.random() * 100), // Génère un ID unique (ceci est juste un exemple)
                itemName: '',
                quantity: quantity.value,
                price: price.value,
                result: result.value,
                total: totalItem
            };
            itemArray.value.push(item);
        };

        // Watch pour mettre à jour les valeurs de result pour chaque nouvel item 
        watchEffect(() => {
            for (let i = 0; i < itemArray.value.length; i++) {
                itemArray.value[i].result = itemArray.value[i].quantity * itemArray.value[i].price; // Effectue la multiplication
            }
        });

        // Boucle pour récupérer toutes les valeurs de itemArray.value[i].result pour ensuite
        // Appliquer un reduce qui permet de faire l'accumulation de tous les prix un après l'autre
        const totalItem = computed(() => {
            const totalItemPrice = []
            for (let i = 0; i < itemArray.value.length; i++) {
                totalItemPrice.push(itemArray.value[i].result)
            }
            return totalItemPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        });



        // Remove l'item selon son id et met à jour le tableau itemArray
        const removeLine = (id) => {
            itemArray.value = itemArray.value.filter((i) => i.id !== id);
        }

        // Nous créons ensuite la fonction qui va être appelé au click et qui va permettre d'envoyer
        // un nouvel objet vers le store (=> puis BDD) 
        const newInvoice = () => {
            const newObject = {
                id: Math.floor(Math.random()*100),
                randomName: randomName,
                streetAdress: streetAdress.value,
                city: city.value,
                postCode: postCode.value,
                country: country.value,
                clientName: cName.value,
                email: email.value,
                cStreet: cStreet.value,
                cCity: cCity.value,
                cPostCode: cPostCode.value,
                cCountry: cCountry.value,
                date: date.value,
                itemName: '',
                quantity: quantity.value,
                price: price.value,
                result: result.value,
                paymentTerms: paymentTerms.value,
                description: description.value,
                itemListing: itemArray.value,
                status: status.value,
                total: totalItem.value
            }
            // streetAdress.value = '';
            // city.value = '';
            // postCode.value = '';
            // country.value = '';
            // cName.value = '';
            // email.value = '';
            // cStreet.value = '';
            // cCity.value = '';
            // cPostCode.value = '';
            // cCountry.value = '';
            // date.value = '';
            // paymentTerms.value = '';
            // description.value = '';
            // itemName.value = '';
            // quantity.value = 0;
            // price.value = 0;
            store.addInvoice(newObject)
        }
        return {
            randomName, newInvoice, addItemLine, streetAdress, city, postCode, country,
            cName, email, cStreet, cCity, cPostCode, cCountry, date, paymentTerms,
            description, itemName, quantity, price, itemArray, removeLine, status, result, totalItem, total
        }
    }
}
</script>

<style lang="scss" scoped>
.styling-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;

    input,
    select {
        height: 34px;
    }
}

.adress-info {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .styling-input {
        // margin-right: 10px;
        width: 30%;
    }
}
</style>