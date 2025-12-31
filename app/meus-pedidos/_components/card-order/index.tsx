"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { MdPayment } from "react-icons/md";

import { createCheckoutSession } from "@/app/pedido/identificacao/actions/create-checkout-session";
import { formatBRL } from "@/app/utils/helpers/formatBRL";
import { translateStatus } from "@/app/utils/helpers/translateStatusPayment";
import { IGetOrders } from "@/app/utils/types/orders";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { cancelOrderStripe } from "../../actions/cancel-order-stripe";

interface ICardOrderProps {
  orders: IGetOrders[];
}

export const CardOrder = ({ orders }: ICardOrderProps) => {
  //router
  const router = useRouter();

  //cacncelar pagamento
  async function handleCancelOrder(orderId: string) {
    if (!orderId) return;

    try {
      const response = await cancelOrderStripe(orderId);
      if (!response.success) {
        toast.error("Não foi possivel cancelar o pedido");
        console.error(response.message);
        return;
      }

      toast.success("Cancelamento solicitado. Aguarde confirmação.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cancelar pedido");
    }
  }

  async function handleCheckPay(orderId: string) {
    if (!orderId) return;

    try {
      const response = await createCheckoutSession(orderId);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      router.push(response.url);
    } catch (error) {
      toast.error("Erro ao iniciar o pagamento");
      console.error(error);
    }
  }

  return (
    <section className="space-y-4 ">
      {orders.length < 1 ? (
        <Card>
          <CardContent>
            <p className="text-2xl font-bold flex items-center justify-center gap-2">
              <AiOutlineShoppingCart size={50} color="#3a7d44" />
              Nenhum pedido feito
            </p>
          </CardContent>
        </Card>
      ) : (
        orders.map((order) => (
          <Card key={order.id}>
            <CardContent>
              <Accordion
                type="single"
                collapsible
                key={order.id}
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="w-full flex flex-col space-y-4 md:flex-row md:gap-20">
                      <div>
                        <p className="font-semibold">Numero do pedido </p>
                        <span className="text-sm text-gray-600">
                          #{order.id.slice(0, 6)}
                        </span>
                      </div>

                      <div className="flex gap-10 md:gap-20">
                        <div className="flex flex-col items-center">
                          <p className="font-semibold">Data</p>
                          <span className="text-sm text-gray-600">
                            {order.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-col items-center ">
                          <p className="font-semibold">Status</p>
                          <Badge
                            variant={`${
                              order.status == "paid"
                                ? "success"
                                : order.status == "canceled" ||
                                  order.status == "failed"
                                ? "destructive"
                                : "secondary"
                            }`}
                          >
                            {translateStatus(order.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="flex flex-col gap-4 text-balance mt-4">
                    <Separator orientation="horizontal" />
                    {order.itemsOrder.map((item) => (
                      <div key={item.id}>
                        {item.product && (
                          <div className="flex gap-4">
                            <div className="w-40 md:w-50 border-2 rounded-3xl p-2">
                              <Link
                                href={`/${item.product.subcategory.category.slug}/${item.product.subcategory.slug}/${item.product.slug}`}
                              >
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  sizes="100vw"
                                  height={0}
                                  width={0}
                                  className="h-auto w-full rounded-3xl"
                                />
                              </Link>
                            </div>
                            <div className="flex flex-col w-full">
                              <p className="font-semibold text-lg mt-4">
                                {item.product.name}
                              </p>
                              <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
                                <span className="text-gray-600">
                                  {item.product.description}
                                </span>
                                <span>{formatBRL(item.price)}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <Separator orientation="horizontal" />
                    <div className="w-full space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Subtotal</span>
                        <span>{formatBRL(order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Entrega</span>
                        <span>{formatBRL(order.shippingCost)}</span>
                      </div>
                      <div className="flex justify-between mt-6 font-bold text-xl">
                        <span>Total</span>
                        <span>{formatBRL(order.total)}</span>
                      </div>
                    </div>
                    {order.status != "failed" && order.status != "canceled" && (
                      <>
                        <Separator orientation="horizontal" />
                        <div className="flex flex-col gap-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            Ações disponíveis
                          </p>

                          <div className="flex flex-wrap gap-3">
                            {/* Cancelar compra */}
                            {(order.status == "paid" ||
                              order.status == "pending") && (
                              <Button
                                onClick={() => handleCancelOrder(order.id)}
                                variant="outline"
                                className=" border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
                              >
                                <MdOutlineCancel className=" h-4 w-4" />
                                Cancelar compra
                              </Button>
                            )}

                            {/* Nota fiscal */}
                            {(order.status == "paid" ||
                              order.status == "delivered" ||
                              order.status == "shipped") && (
                              <Button
                                variant="outline"
                                className=" border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition cursor-pointer"
                              >
                                <FiFileText className="h-4 w-4" />
                                Nota fiscal
                              </Button>
                            )}

                            {/* botao de pagamento */}
                            {order.status == "pending" && (
                              <Button
                                variant="outline"
                                className=" border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition cursor-pointer"
                                onClick={() => handleCheckPay(order.id)}
                              >
                                <MdPayment className="h-4 w-4" />
                                Finalizar pagamento
                              </Button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))
      )}
    </section>
  );
};
