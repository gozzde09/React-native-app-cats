// Keyboard Avoiding :https://reactnative.dev/docs/keyboardavoidingview
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UserFeedbackForm () {
  const [rating, setRating] = useState(0);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address, @ is required")
      .required("Email is required"),
    comment: Yup.string().required("Please leave a comment"),
    rate: Yup.number().min(1, "Please rate the website"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
      rate: 0,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      Alert.alert("Thank you for your feedback, " + values.name + "!");
      resetForm();
      setRating(0);
    },
  });

  const handleRatingClick = (index) => {
    setRating(index);
    formik.setFieldValue("rate", index);
    formik.setFieldTouched("rate", true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.rubrik}>Leave a Review</Text>
        {/* NAME */}
        <TextInput
          placeholder='Name'
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          value={formik.values.name}
          style={styles.input}
        />
        {formik.touched.name && formik.errors.name ? (
          <Text style={{ color: "#FB8A21", marginBottom: 10 }}>
            {formik.errors.name}
          </Text>
        ) : null}

        {/* EMAIL */}
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          value={formik.values.email}
          style={styles.input}
        />
        {formik.touched.email && formik.errors.email ? (
          <Text style={{ color: "#FB8A21", marginBottom: 10 }}>
            {formik.errors.email}
          </Text>
        ) : null}

        {/* RATING */}
        <Text style={{ marginVertical: 10 }}>Rating:</Text>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <Text
                key={index}
                style={{
                  fontSize: 30,
                  color: index <= rating ? "#FB8A21" : "lightgray",
                }}
                onPress={() => handleRatingClick(index)}>
                ★
              </Text>
            );
          })}
        </View>
        {formik.touched.rate && formik.errors.rate ? (
          <Text style={{ color: "#FB8A21", marginBottom: 10 }}>
            {formik.errors.rate}
          </Text>
        ) : null}

        {/* COMMENT */}
        <TextInput
          placeholder='Leave a comment here'
          multiline={true}
          numberOfLines={5}
          onChangeText={formik.handleChange("comment")}
          onBlur={formik.handleBlur("comment")}
          value={formik.values.comment}
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        />
        {formik.touched.comment && formik.errors.comment ? (
          <Text style={{ color: "#FB8A21", marginBottom: 10 }}>
            {formik.errors.comment}
          </Text>
        ) : null}

        {/* SUBMIT BUTTON */}
        <TouchableOpacity onPress={formik.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  rubrik: {
    fontSize: 28,
    color: "#1C2B63",
    fontFamily: "PatrickHand-Regular",
    marginTop:30
  },
  input: {
    width: 350,
    fontSize: 20,
    backgroundColor: "#f5f5f5",
    borderColor: "#1C2B63",
    borderWidth: 2,
    borderRadius: 20,
    margin: 20,
    padding: 10,
    fontFamily: "PatrickHand-Regular",
  },
  buttonText: {
    color: "#f5f5f5",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "PatrickHand-Regular",
  },
  button: {
    backgroundColor: "#FB8A21",
    borderRadius: 15,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
});
