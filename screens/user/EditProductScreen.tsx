import React, { useCallback, useEffect, useReducer } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform,
} from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'

const styles = StyleSheet.create({
    form: { margin: 20 },
    formControl: { width: '100%' },
    label: {
        fontWeight: 'bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
})

const UPDATE_PRODUCT_FORM = 'UPDATE_PRODUCT_FORM'

const productFormReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_FORM:
            const updatedInputValues = {
                ...state.inputValues,
                [action.input]: action.inputValue,
            }
            const updatedInputValidities = {
                ...state.inputValidities,
                [action.input]: action.inputValue.length > 0,
            }

            let formIsValid = true
            // eslint-disable-next-line no-restricted-syntax
            for (const key in updatedInputValidities) {
                // eslint-disable-next-line no-prototype-builtins
                if (updatedInputValidities.hasOwnProperty(key)) {
                    formIsValid = formIsValid && updatedInputValidities[key]
                }
            }

            return {
                inputValues: updatedInputValues,
                inputValidities: updatedInputValidities,
                formIsValid,
            }

        default:
            return state
    }
}

const EditProductScreen: NavigationStackScreenComponent = ({ navigation }) => {
    const dispatch = useDispatch()

    const productId = navigation.getParam('productId')
    const editedProduct = useSelector((state: any) =>
        state.products.userProducts.find(product => product.id === productId),
    )

    const [productFormState, dispatchProductForm] = useReducer(
        productFormReducer,
        {
            inputValues: {
                title: editedProduct ? editedProduct.title : '',
                imageUrl: editedProduct ? editedProduct.imageUrl : '',
                price: '',
                description: editedProduct ? editedProduct.description : '',
            },
            inputValidities: {
                title: !!editedProduct,
                imageUrl: !!editedProduct,
                price: !!editedProduct,
                description: !!editedProduct,
            },
            formIsValid: !!editedProduct,
        },
    )

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(
                productsActions.updateProduct(
                    productId,
                    productFormState.inputValues.title,
                    productFormState.inputValues.description,
                    productFormState.inputValues.imageUrl,
                ),
            )
        } else {
            dispatch(
                productsActions.createProduct(
                    productFormState.inputValues.title,
                    productFormState.inputValues.description,
                    productFormState.inputValues.imageUrl,
                    Number(productFormState.inputValues.price),
                ),
            )
        }
        navigation.goBack()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editedProduct, dispatch, productId, productFormState])

    useEffect(() => {
        navigation.setParams({ submit: submitHandler })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={productFormState.inputValues.title}
                        onChangeText={text => {
                            dispatchProductForm({
                                type: UPDATE_PRODUCT_FORM,
                                input: 'title',
                                inputValue: text,
                            })
                        }}
                        keyboardType="default"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={productFormState.inputValues.imageUrl}
                        onChangeText={text =>
                            dispatchProductForm({
                                type: UPDATE_PRODUCT_FORM,
                                input: 'imageUrl',
                                inputValue: text,
                            })
                        }
                    />
                </View>
                {!editedProduct && (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={productFormState.inputValues.price}
                            onChangeText={text =>
                                dispatchProductForm({
                                    type: UPDATE_PRODUCT_FORM,
                                    input: 'price',
                                    inputValue: text,
                                })
                            }
                            keyboardType="decimal-pad"
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={productFormState.inputValues.description}
                        onChangeText={text =>
                            dispatchProductForm({
                                type: UPDATE_PRODUCT_FORM,
                                input: 'description',
                                inputValue: text,
                            })
                        }
                    />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => ({
    headerTitle: navData.navigation.getParam('productId')
        ? 'Edit Product'
        : 'Add Product',
    headerRight: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Save"
                iconName={
                    Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                }
                onPress={navData.navigation.getParam('submit')}
            />
        </HeaderButtons>
    ),
})

export default EditProductScreen
